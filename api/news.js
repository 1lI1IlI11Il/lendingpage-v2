const ASSET_NEWS_QUERY = {
  kospi: 'KOSPI',
  kosdaq: 'KOSDAQ',
  nasdaq: 'Nasdaq',
  'spot-gold': 'spot gold',
  wti: 'WTI crude oil',
  dxy: 'US dollar index DXY',
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
  }

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? decodeHtml(match[1].trim()) : ''
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, '').trim()
}

function parseGoogleNewsRss(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]

  return items.slice(0, 8).map((match) => {
    const block = match[1]
    const title = extractTag(block, 'title')
    const link = extractTag(block, 'link')
    const pubDate = extractTag(block, 'pubDate')
    const source = extractTag(block, 'source') || 'Google News'
    const description = stripHtml(extractTag(block, 'description'))

    return {
      title,
      url: link,
      publishedAt: pubDate,
      source,
      summary: description,
    }
  }).filter((item) => item.title && item.url)
}

export async function fetchNewsPayload(assetId) {
  const query = ASSET_NEWS_QUERY[assetId]

  if (!query) {
    throw new Error(`Unsupported asset for news: ${assetId}`)
  }

  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:7d`)}&hl=en-US&gl=US&ceid=US:en`
  const response = await fetch(rssUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })

  if (!response.ok) {
    throw new Error(`Upstream news request failed: ${response.status}`)
  }

  const xml = await response.text()
  const items = parseGoogleNewsRss(xml)

  return {
    assetId,
    provider: 'google-news-rss',
    query,
    items,
    fetchedAt: new Date().toISOString(),
  }
}

export default async function handler(request, response) {
  const { assetId } = request.query

  try {
    const payload = await fetchNewsPayload(assetId)
    response.status(200).json(payload)
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown news proxy error',
    })
  }
}
