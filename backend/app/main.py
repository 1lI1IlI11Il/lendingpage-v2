from __future__ import annotations

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .contracts import AnalysisRequest, AnalysisResponse, HealthResponse
from .market_data import MarketDataError
from .service import KronosAnalysisService, KronosBootstrapError, get_analysis_service

settings = get_settings()

app = FastAPI(title=settings.app_name)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse)
def health(
    service: KronosAnalysisService = Depends(get_analysis_service),
) -> HealthResponse:
    return HealthResponse(**service.health())


@app.post(f"{settings.api_prefix}/analyze", response_model=AnalysisResponse)
def analyze(
    request: AnalysisRequest,
    service: KronosAnalysisService = Depends(get_analysis_service),
) -> AnalysisResponse:
    try:
        return service.analyze(request)
    except (MarketDataError, KronosBootstrapError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # pragma: no cover - surface runtime failures clearly
        raise HTTPException(
            status_code=500, detail=f"Unexpected analysis failure: {exc}"
        ) from exc
