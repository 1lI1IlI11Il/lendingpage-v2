from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
import sys
import time
from typing import Any

import pandas as pd

from .config import Settings, get_settings
from .contracts import (
    AnalysisRequest,
    AnalysisResponse,
    AnalysisSummary,
    Diagnostics,
    ForecastBar,
)
from .market_data import MarketDataError, build_future_index, fetch_market_history


class KronosBootstrapError(RuntimeError):
    pass


@dataclass
class _RuntimeState:
    predictor: Any | None = None
    model_loaded: bool = False


class KronosAnalysisService:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._state = _RuntimeState()

    def vendor_present(self) -> bool:
        model_dir = self.settings.vendor_kronos_path / "model"
        return model_dir.exists() and (model_dir / "kronos.py").exists()

    def model_loaded(self) -> bool:
        return self._state.model_loaded

    def _ensure_vendor_import(self) -> None:
        vendor_root = self.settings.vendor_kronos_path
        if not vendor_root.exists():
            raise KronosBootstrapError(
                f"Kronos vendor repository is missing at {vendor_root}. Clone it before starting the API.",
            )

        vendor_root_str = str(vendor_root)
        if vendor_root_str not in sys.path:
            sys.path.insert(0, vendor_root_str)

    def _get_predictor(self):
        if self._state.predictor is not None:
            return self._state.predictor

        self._ensure_vendor_import()

        try:
            from model import Kronos, KronosPredictor, KronosTokenizer
        except Exception as exc:  # pragma: no cover - import path safety net
            raise KronosBootstrapError(
                f"Failed to import Kronos runtime: {exc}"
            ) from exc

        tokenizer = KronosTokenizer.from_pretrained(self.settings.kronos_tokenizer_id)
        model = Kronos.from_pretrained(self.settings.kronos_model_id)
        predictor = KronosPredictor(
            model=model, tokenizer=tokenizer, max_context=self.settings.max_lookback
        )

        self._state.predictor = predictor
        self._state.model_loaded = True
        return predictor

    def health(self) -> dict[str, Any]:
        return {
            "status": "ok",
            "model_loaded": self.model_loaded(),
            "vendor_present": self.vendor_present(),
            "model_id": self.settings.kronos_model_id,
            "tokenizer_id": self.settings.kronos_tokenizer_id,
        }

    def analyze(self, request: AnalysisRequest) -> AnalysisResponse:
        started_at = time.perf_counter()
        predictor = self._get_predictor()
        market_history = fetch_market_history(
            symbol=request.symbol,
            market=request.market,
            interval=request.interval,
            lookback=request.lookback,
        )

        history_frame = market_history.frame.copy()
        last_history_timestamp = pd.to_datetime(history_frame.index.to_list()[-1])
        future_index = build_future_index(last_history_timestamp, request.horizon)

        forecast_frame = predictor.predict(
            df=history_frame[["open", "high", "low", "close", "volume", "amount"]],
            x_timestamp=history_frame.index.to_series(index=history_frame.index),
            y_timestamp=future_index.to_series(index=future_index),
            pred_len=request.horizon,
            T=request.temperature,
            top_p=request.top_p,
            sample_count=request.sample_count,
            verbose=False,
        )

        last_close = float(history_frame["close"].iloc[-1])
        projected_close = float(forecast_frame["close"].iloc[-1])
        projected_return_pct = (
            ((projected_close - last_close) / last_close) * 100 if last_close else 0.0
        )
        direction = "flat"
        if projected_return_pct > 0.15:
            direction = "bullish"
        elif projected_return_pct < -0.15:
            direction = "bearish"

        summary = AnalysisSummary(
            direction=direction,
            last_close=round(last_close, 4),
            projected_close=round(projected_close, 4),
            projected_return_pct=round(projected_return_pct, 3),
            horizon_days=request.horizon,
            summary=(
                f"{request.symbol.upper()} is projected to move {projected_return_pct:.2f}% over the next "
                f"{request.horizon} trading day(s) based on {request.lookback} daily bars."
            ),
        )

        inference_ms = int((time.perf_counter() - started_at) * 1000)
        return AnalysisResponse(
            symbol=request.symbol.upper(),
            market=request.market,
            interval=request.interval,
            lookback=request.lookback,
            horizon=request.horizon,
            summary=summary,
            history=_frame_to_bars(history_frame),
            forecast=_frame_to_bars(forecast_frame),
            diagnostics=Diagnostics(
                model_id=self.settings.kronos_model_id,
                tokenizer_id=self.settings.kronos_tokenizer_id,
                normalized_symbol=market_history.normalized_symbol,
                data_source=market_history.source,
                inference_ms=inference_ms,
                model_loaded=self.model_loaded(),
                fetched_at=datetime.now(timezone.utc),
            ),
        )


def _frame_to_bars(frame: pd.DataFrame) -> list[ForecastBar]:
    payload: list[ForecastBar] = []
    for timestamp, row in frame.iterrows():
        timestamp_value = pd.to_datetime(str(timestamp))
        payload.append(
            ForecastBar(
                time=timestamp_value.date().isoformat(),
                open=round(float(row["open"]), 4),
                high=round(float(row["high"]), 4),
                low=round(float(row["low"]), 4),
                close=round(float(row["close"]), 4),
                volume=round(float(row["volume"]), 4),
                amount=round(float(row["amount"]), 4),
            ),
        )
    return payload


@lru_cache(maxsize=1)
def get_analysis_service() -> KronosAnalysisService:
    return KronosAnalysisService(get_settings())
