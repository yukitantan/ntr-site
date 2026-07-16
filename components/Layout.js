import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const CATEGORIES = [
  { label: '🔥 人気総合', type: 'doujin', keyword: 'NTR 寝取られ', sort: 'rank' },
  { label: '📚 NTR同人誌', type: 'doujin', keyword: '寝取られ', sort: 'rank' },
  { label: '📖 山文京伝特集', type: 'manga', keyword: '山文京伝', sort: 'rank' },
  { label: '✨ 空上特集', type: 'doujin', keyword: '空上 寝取られ', sort: 'rank' },
  { label: '🎮 NTR同人ゲーム', type: 'game', keyword: '寝取られ', sort: 'rank' },
  { label: '新着同人', type: 'doujin', keyword: 'NTR', sort: 'date' },
  { label: '人妻NTR', type: 'doujin', keyword: '人妻 寝取られ', sort: 'rank' },
]

export default function Layout({ children, title, description }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <>
      <Head>
        <title>{title || '寝取らせっていいよね - NTR同人誌・エロ漫画まとめ'}</title>
        <meta name="description" content={description || 'NTR・寝取られ系の同人誌・エロ漫画・同人ゲームをFANZAからまとめてご紹介。'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            寝取らせって<span>いいよね</span>
            <small>NTR同人誌・エロ漫画まとめ</small>
          </a>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="タイトル・サークル名で検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn">検索</button>
          </form>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-inner">
          {CATEGORIES.map((c) => {
            const isActive = router.query.type === c.type && router.query.q === c.keyword
            return (
              <a
                key={c.label}
                href={`/?type=${c.type}&q=${encodeURIComponent(c.keyword)}&sort=${c.sort}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {c.label}
              </a>
            )
          })}
        </div>
      </nav>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="footer-warning">
          ※ このサイトはアダルト向けです。18歳未満の方のアクセスはご遠慮ください。
        </div>
        当サイトはFANZAのアフィリエイトプログラムに参加しています。<br />
        掲載情報はFANZA（DMM）より取得しています。<br />
        <a href="https://affiliate.dmm.com" target="_blank" rel="noopener noreferrer">DMM アフィリエイト</a>
      </footer>
    </>
  )
}
