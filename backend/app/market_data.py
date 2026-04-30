from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone

import pandas as pd
import yfinance as yf


class MarketDataError(RuntimeError):
    pass


@dataclass(frozen=True)
class MarketHistory:
    normalized_symbol: str
    source: str
    frame: pd.DataFrame


def normalize_symbol(symbol: str, market: str) -> str:
    cleaned = symbol.strip().upper().replace(" ", "")
    if not cleaned:
        raise MarketDataError("Symbol is required")

    if cleaned.endswith((".KS", ".KQ")) or cleaned.startswith("^"):
        return cleaned

    if cleaned.isdigit() and len(cleaned) == 6:
        suffix = ".KS" if market.upper() == "KOSPI" else ".KQ"
        return f"{cleaned}{suffix}"

    return cleaned


def _coerce_history_frame(frame: pd.DataFrame) -> pd.DataFrame:
    if frame.empty:
        raise MarketDataError("No OHLCV rows returned from upstream data source")

    if isinstance(frame.columns, pd.MultiIndex):
        frame.columns = frame.columns.get_level_values(0)

    required_columns = ["Open", "High", "Low", "Close", "Volume"]
    missing = [column for column in required_columns if column not in frame.columns]
    if missing:
        raise MarketDataError(
            f"Upstream history is missing required columns: {', '.join(missing)}"
        )

    normalized = frame.loc[:, required_columns].copy()
    normalized.columns = ["open", "high", "low", "close", "volume"]
    normalized.index = pd.DatetimeIndex(normalized.index)
    if normalized.index.tz is not None:
        normalized.index = normalized.index.tz_convert(None)
    normalized = normalized.dropna(
        subset=["open", "high", "low", "close"]
    )  # volume can be zero
    if normalized.empty:
        raise MarketDataError("History became empty after dropping NaN OHLC rows")

    normalized["amount"] = normalized["volume"] * normalized[
        ["open", "high", "low", "close"]
    ].mean(axis=1)
    return normalized


def fetch_market_history(
    symbol: str, market: str, interval: str, lookback: int
) -> MarketHistory:
    normalized_symbol = normalize_symbol(symbol, market)
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=max(lookback * 3, 365))

    frame = yf.download(
        normalized_symbol,
        start=start.date().isoformat(),
        end=end.date().isoformat(),
        interval=interval,
        auto_adjust=False,
        progress=False,
    )
    if frame is None:
        raise MarketDataError("Upstream data source returned no frame")

    normalized = _coerce_history_frame(frame).tail(lookback)
    if len(normalized) < lookback:
        raise MarketDataError(
            f"Need at least {lookback} daily rows for analysis, but only received {len(normalized)} rows",
        )

    return MarketHistory(
        normalized_symbol=normalized_symbol, source="yfinance", frame=normalized
    )


def build_future_index(last_timestamp: pd.Timestamp, periods: int) -> pd.DatetimeIndex:
    normalized_last_timestamp = pd.Timestamp(last_timestamp)
    normalized_date = datetime(
        int(normalized_last_timestamp.year),
        int(normalized_last_timestamp.month),
        int(normalized_last_timestamp.day),
    )
    next_day = normalized_date + timedelta(days=1)
    return pd.bdate_range(start=next_day, periods=periods)
