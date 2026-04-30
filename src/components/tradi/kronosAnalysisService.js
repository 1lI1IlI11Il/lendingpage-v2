const DEFAULT_ANALYSIS_API_BASE_URL = 'http://127.0.0.1:8000'

function getApiBaseUrl() {
  return (import.meta.env.VITE_ANALYSIS_API_BASE_URL ?? DEFAULT_ANALYSIS_API_BASE_URL).replace(/\/$/, '')
}

export async function analyzeKronosSymbol(payload) {
  const response = await fetch(`${getApiBaseUrl()}/v1/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.detail ?? data?.error ?? 'Kronos analysis request failed'
    throw new Error(message)
  }

  return data
}
