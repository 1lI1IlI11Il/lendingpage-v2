from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class AnalysisRequest(BaseModel):
    symbol: str = Field(
        ..., min_length=1, description="KRX symbol like 005930 or a Yahoo-style symbol"
    )
    market: Literal["KOSPI", "KOSDAQ"] = Field(default="KOSPI")
    interval: Literal["1d"] = Field(default="1d")
    lookback: int = Field(default=240, ge=60, le=512)
    horizon: int = Field(default=5, ge=1, le=30)
    temperature: float = Field(default=1.0, ge=0.1, le=2.0)
    top_p: float = Field(default=0.9, gt=0.0, le=1.0)
    sample_count: int = Field(default=5, ge=1, le=16)


class ForecastBar(BaseModel):
    time: str
    open: float
    high: float
    low: float
    close: float
    volume: float
    amount: float


class AnalysisSummary(BaseModel):
    direction: Literal["bullish", "bearish", "flat"]
    last_close: float
    projected_close: float
    projected_return_pct: float
    horizon_days: int
    summary: str


class Diagnostics(BaseModel):
    model_id: str
    tokenizer_id: str
    normalized_symbol: str
    data_source: str
    inference_ms: int
    model_loaded: bool
    fetched_at: datetime


class AnalysisResponse(BaseModel):
    symbol: str
    market: str
    interval: str
    lookback: int
    horizon: int
    summary: AnalysisSummary
    history: list[ForecastBar]
    forecast: list[ForecastBar]
    diagnostics: Diagnostics


class HealthResponse(BaseModel):
    status: Literal["ok"]
    model_loaded: bool
    vendor_present: bool
    model_id: str
    tokenizer_id: str
