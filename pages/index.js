import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import VideoCard from '../components/VideoCard'

const SORT_OPTIONS = [
  { label: '人気順', value: 'rank' },
  { label: '新着順', value: 'date' },
  { label: 'レビュー順', value: 'review' },
]

const TYPE_LABELS = {
  doujin: 'NTR同人誌',
  manga: 'エロ漫画',
  game: '同人ゲーム',
}

export default function Home() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const keyword = router.query.q || 'NTR 寝取られ'
  const type = router.query.type || 'doujin'
  const sort = router.query.sort || 'rank'
  const HITS = 20

  const fetchItems = useCallback(async (kw, pg, srt, tp) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ keyword: kw, page: pg, hits: HITS, sort: srt, type: tp })
      const r = await fetch(`/api/items?${params}`)
      const data = await r.json()
      setItems(data.items || [])
      setTotal(data.total || 0)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    setPage(1)
    fetchItems(keyword, 1, sort, type)
  }, [router.isReady, keyword, sort, type, fetchItems])

  const handlePageChange = (newPage) => {
    setPage(newPage)
    fetchItems(keyword, newPage, sort, type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(total / HITS)
  const sectionLabel = TYPE_LABELS[type] || 'NTR同人誌'

  return (
    <Layout>
      <div className="hero" style={{ margin: '-28px -16px 28px', padding: '28px 16px' }}>
        <h1>
          <span className="red">NTR</span> 同人誌・エロ漫画まとめ
        </h1>
        <p>寝取られ・NTR系の人気作品を厳選紹介 | {total.toLocaleString()} 作品</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div className="section-title" style={{ margin: 0 }}>
          {keyword !== 'NTR 寝取られ' ? `「${keyword}」の検索結果` : `${sectionLabel}ランキング`}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              className={`pill ${sort === o.value ? 'active' : ''}`}
              onClick={() => router.push(`/?type=${type}&q=${encodeURIComponent(keyword)}&sort=${o.value}`)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">読み込み中...</div>
      ) : (
        <>
          <div className="grid">
            {items.map((item) => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="page-btn" onClick={() => handlePageChange(Math.max(1, page - 1))} disabled={page === 1}>
                ← 前
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4))
                const n = start + i
                return (
                  <button key={n} className={`page-btn ${page === n ? 'active' : ''}`} onClick={() => handlePageChange(n)}>
                    {n}
                  </button>
                )
              })}
              <button className="page-btn" onClick={() => handlePageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
                次 →
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  )
}
