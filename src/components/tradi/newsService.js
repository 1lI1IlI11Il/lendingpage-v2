import { assetOptions, newsItems as fallbackNewsItems, newsThemes as fallbackNewsThemes } from './data'

export async function getAssetNewsPayload(assetId) {
  const asset = assetOptions.find((item) => item.id === assetId) ?? assetOptions[0]

  try {
    const response = await fetch(`/api/news?assetId=${encodeURIComponent(asset.id)}`)
    if (!response.ok) {
      throw new Error('News request failed')
    }

    const payload = await response.json()
    const items = (payload.items ?? []).map((item) => ({
      source: item.source,
      tag: asset.symbol,
      priority: 'Live',
      headline: item.title,
      detail: item.summary || `${asset.symbol} live news item from ${item.source}.`,
      deskTake: item.publishedAt || 'Recent feed item',
      url: item.url,
    }))

    return {
      provider: payload.provider ?? 'google-news-rss',
      items,
      themes: [
        { label: 'Asset', value: asset.symbol, tone: asset.tone },
        { label: 'Feed', value: payload.provider ?? 'google-news-rss', tone: 'text-cyan-300' },
        { label: 'Query', value: payload.query ?? asset.symbol, tone: 'text-zinc-300' },
        { label: 'Items', value: `${items.length}`, tone: 'text-amber-300' },
      ],
    }
  } catch {
    return {
      provider: 'local-fallback',
      items: fallbackNewsItems,
      themes: fallbackNewsThemes,
    }
  }
}
