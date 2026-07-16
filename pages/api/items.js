const FANZA_API_ID = process.env.FANZA_API_ID
const FANZA_AFFILIATE_ID = process.env.FANZA_AFFILIATE_ID
const BASE_URL = 'https://api.dmm.com/affiliate/v3/ItemList'

const FLOORS = {
  doujin: { service: 'digital', floor: 'digital_doujin' },
  manga: { service: 'ebook', floor: 'comic' },
  game: { service: 'pcgame', floor: 'digital_pcgame' },
}

export default async function handler(req, res) {
  const { keyword = 'NTR 寝取られ', sort = 'rank', page = 1, hits = 20, type = 'doujin' } = req.query
  const floor = FLOORS[type] || FLOORS.doujin
  const offset = (parseInt(page) - 1) * parseInt(hits) + 1

  const params = new URLSearchParams({
    api_id: FANZA_API_ID,
    affiliate_id: FANZA_AFFILIATE_ID,
    site: 'FANZA',
    service: floor.service,
    floor: floor.floor,
    hits: String(hits),
    offset: String(offset),
    sort,
    output: 'json',
  })

  if (keyword) params.set('keyword', keyword)

  try {
    const r = await fetch(`${BASE_URL}?${params}`)
    const data = await r.json()

    if (data.result?.status !== 200) {
      return res.status(400).json({ error: data.result?.message || 'API error' })
    }

    const items = (data.result.items || []).map((item) => ({
      id: item.content_id,
      title: item.title,
      image: item.imageURL?.large,
      thumb: item.imageURL?.list,
      url: item.affiliateURL,
      date: item.date,
      price: item.prices?.price,
      review: item.review,
      circle: item.iteminfo?.label?.[0]?.name || item.iteminfo?.maker?.[0]?.name || '',
      author: item.iteminfo?.author?.map((a) => a.name) || [],
      genre: item.iteminfo?.genre?.map((g) => g.name) || [],
      type,
    }))

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.json({
      items,
      total: data.result.total_count,
      page: parseInt(page),
      hits: parseInt(hits),
    })
  } catch (e) {
    res.status(500).json({ error: 'fetch failed' })
  }
}
