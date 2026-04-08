const FEEDS = [
  {
    source: 'Federal Reserve',
    impact: 'High',
    url: 'https://www.federalreserve.gov/feeds/press_all.xml',
  },
  {
    source: 'EIA',
    impact: 'Medium',
    url: 'https://www.eia.gov/rss/press_rss.xml',
  },
]

function decodeHtml(value) {
  return value
    .replace(/<!\[CDATA\[/g, '')
    .replace(/\]\]>/g, '')
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

function parseRssItems(xml, source, impact) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8).map((match) => {
    const block = match[1]
    const event = extractTag(block, 'title')
    const link = extractTag(block, 'link')
    const pubDate = extractTag(block, 'pubDate')
    const category = extractTag(block, 'category') || source
    const description = extractTag(block, 'description')

    return {
      event,
      time: pubDate,
      impact,
      source,
      forecast: category,
      actual: 'Released',
      prep: description || `${source} release feed item`,
      url: link,
    }
  }).filter((item) => item.event)
}

export async function fetchCalendarPayload() {
  const feedResults = await Promise.all(
    FEEDS.map(async (feed) => {
      const response = await fetch(feed.url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      })

      if (!response.ok) {
        throw new Error(`Calendar upstream failed: ${response.status}`)
      }

      const xml = await response.text()
      return parseRssItems(xml, feed.source, feed.impact)
    }),
  )

  return {
    provider: 'fed-eia-rss',
    events: feedResults.flat().sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10),
    fetchedAt: new Date().toISOString(),
  }
}

export default async function handler(_request, response) {
  try {
    const payload = await fetchCalendarPayload()
    response.status(200).json(payload)
  } catch (error) {
    response.status(400).json({
      error: error instanceof Error ? error.message : 'Unknown calendar proxy error',
    })
  }
}
