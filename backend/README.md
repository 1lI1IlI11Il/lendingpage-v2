# Kronos analysis backend

This backend exposes a minimal FastAPI service for KOSPI/KOSDAQ stock analysis using the Kronos model.

## What it does

- accepts a Korean stock symbol such as `005930`
- fetches daily OHLCV history from Yahoo Finance
- runs Kronos inference on the last `lookback` bars
- returns structured forecast candles and a compact summary

## Layout

- `app/main.py` — FastAPI entrypoint
- `app/service.py` — Kronos loading and inference orchestration
- `app/market_data.py` — symbol normalization and OHLCV retrieval
- `tests/test_api.py` — API smoke tests with a fake service
- `vendor/Kronos` — upstream Kronos source cloned locally for runtime imports

## Setup

```bash
cd backend
./scripts/bootstrap_vendor.sh
python3 -m pip install -r requirements.txt --target .python_packages
PYTHONPATH="$(pwd)/.python_packages:$(pwd)/vendor/Kronos" python3 -S -m uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `POST /v1/analyze`

Example request:

```json
{
  "symbol": "005930",
  "market": "KOSPI",
  "interval": "1d",
  "lookback": 240,
  "horizon": 5,
  "temperature": 1.0,
  "top_p": 0.9,
  "sample_count": 5
}
```

## Notes

- The MVP uses Yahoo Finance daily bars for availability.
- Kronos weights are downloaded from Hugging Face at first use.
- Run `scripts/bootstrap_vendor.sh` after cloning the repo to fetch the upstream Kronos source into `backend/vendor/Kronos`.
- Python dependencies are installed into `backend/.python_packages` in this environment because `python3-venv` is unavailable.
