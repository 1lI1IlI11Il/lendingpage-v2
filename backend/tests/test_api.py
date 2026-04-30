from __future__ import annotations

from datetime import datetime, timezone

from fastapi.testclient import TestClient

from app.main import app
from app.service import get_analysis_service


class FakeAnalysisService:
    def health(self):
        return {
            "status": "ok",
            "model_loaded": False,
            "vendor_present": True,
            "model_id": "fake-model",
            "tokenizer_id": "fake-tokenizer",
        }

    def analyze(self, request):
        return {
            "symbol": request.symbol,
            "market": request.market,
            "interval": request.interval,
            "lookback": request.lookback,
            "horizon": request.horizon,
            "summary": {
                "direction": "bullish",
                "last_close": 100.0,
                "projected_close": 103.0,
                "projected_return_pct": 3.0,
                "horizon_days": request.horizon,
                "summary": "Synthetic forecast for tests.",
            },
            "history": [
                {
                    "time": "2026-04-10",
                    "open": 99.0,
                    "high": 101.0,
                    "low": 98.0,
                    "close": 100.0,
                    "volume": 12345.0,
                    "amount": 1234500.0,
                }
            ],
            "forecast": [
                {
                    "time": "2026-04-11",
                    "open": 100.5,
                    "high": 104.0,
                    "low": 100.0,
                    "close": 103.0,
                    "volume": 15000.0,
                    "amount": 1500000.0,
                }
            ],
            "diagnostics": {
                "model_id": "fake-model",
                "tokenizer_id": "fake-tokenizer",
                "normalized_symbol": "005930.KS",
                "data_source": "fake-source",
                "inference_ms": 12,
                "model_loaded": False,
                "fetched_at": datetime.now(timezone.utc).isoformat(),
            },
        }


def test_health_endpoint_reports_runtime_status():
    app.dependency_overrides[get_analysis_service] = lambda: FakeAnalysisService()
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["vendor_present"] is True

    app.dependency_overrides.clear()


def test_analyze_endpoint_returns_structured_payload():
    app.dependency_overrides[get_analysis_service] = lambda: FakeAnalysisService()
    client = TestClient(app)

    response = client.post(
        "/v1/analyze",
        json={
            "symbol": "005930",
            "market": "KOSPI",
            "interval": "1d",
            "lookback": 240,
            "horizon": 5,
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["summary"]["direction"] == "bullish"
    assert payload["diagnostics"]["normalized_symbol"] == "005930.KS"
    assert len(payload["forecast"]) == 1

    app.dependency_overrides.clear()
