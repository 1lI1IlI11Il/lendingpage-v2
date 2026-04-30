from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path
import os


@dataclass(frozen=True)
class Settings:
    app_name: str
    api_prefix: str
    kronos_model_id: str
    kronos_tokenizer_id: str
    default_market: str
    default_interval: str
    max_lookback: int
    max_horizon: int
    vendor_kronos_path: Path


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    backend_root = Path(__file__).resolve().parent.parent
    vendor_kronos_path = backend_root / "vendor" / "Kronos"

    return Settings(
        app_name=os.getenv("KRONOS_APP_NAME", "Kronos KOSPI API"),
        api_prefix=os.getenv("KRONOS_API_PREFIX", "/v1"),
        kronos_model_id=os.getenv("KRONOS_MODEL_ID", "NeoQuasar/Kronos-base"),
        kronos_tokenizer_id=os.getenv(
            "KRONOS_TOKENIZER_ID", "NeoQuasar/Kronos-Tokenizer-base"
        ),
        default_market=os.getenv("KRONOS_DEFAULT_MARKET", "KOSPI"),
        default_interval=os.getenv("KRONOS_DEFAULT_INTERVAL", "1d"),
        max_lookback=int(os.getenv("KRONOS_MAX_LOOKBACK", "512")),
        max_horizon=int(os.getenv("KRONOS_MAX_HORIZON", "30")),
        vendor_kronos_path=vendor_kronos_path,
    )
