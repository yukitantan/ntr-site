import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import VideoCard from '../components/VideoCard'

const SORT_OPTIONS = [
  { label: '新着順', value: 'date' },
  { label: '人気順', value: 'rank' },
  { label: 'レビュー順', value: 'review' },
]

export default function Home() {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('date')
  const [loading, setLoading] = useState(false)

  const keyword = router.query.q || '寝取られ'
  const HITS = 24

  const fetchItems = useCallback(async (kw, pg, srt) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ keyword: kw, page: pg, hits: HITS, sort: srt })
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
    fetchItems(keyword, 1, sort)
  }, [router.isReady, keyword, sort, fetchItems])

  useEffect(() => {
    if (!router.isReady) return
    fetchItems(keyword, page, sort)
  }, [page]) // eslint-disable-line

  const totalPages = Math.ceil(total / HITS)

  return (
    <Layout>
      <div className="hero" style={{ marginBottom: 24, marginLeft: -16, marginRight: -16, padding: '24px 16px' }}>
        <h1>
          <span className="red">NTR</span> 寝取られ動画まとめ
        </h1>
        <p>FANZA最新作・人気作を毎日更新 | 現在 {total.toLocaleString()} 本</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <div className="section-title" style={{ margin: 0 }}>
          {keyword !== '寝取られ' ? `「${keyword}」の検索結果` : '最新NTR動画'}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              className={`pill ${sort === o.value ? 'active' : ''}`}
              onClick={() => setSort(o.value)}
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
              <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                ← 前
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4))
                const n = start + i
                return (
                  <button key={n} className={`page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>
                    {n}
                  </button>
                )
              })}
              <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                次 →
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  )
}
