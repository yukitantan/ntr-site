import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const GENRES = [
  { label: 'すべて', keyword: '寝取られ' },
  { label: '寝取られ', keyword: '寝取られ' },
  { label: '人妻NTR', keyword: '人妻 寝取られ' },
  { label: 'ネトラレ', keyword: 'ネトラレ' },
  { label: 'NTR 同人', keyword: 'NTR 同人' },
  { label: '寝取り', keyword: '寝取り' },
  { label: '旦那の目の前', keyword: '旦那の目の前' },
  { label: '浮気', keyword: '浮気 寝取られ' },
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
        <title>{title || '寝取らせっていいよね - NTR動画まとめ'}</title>
        <meta name="description" content={description || 'NTR・寝取られ・寝取り系の人気動画をFANZAからまとめてご紹介。'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <header className="header">
        <div className="header-inner">
          <a href="/" className="logo">
            寝取らせって<span>いいよね</span>
            <small>NTR動画まとめ</small>
          </a>
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="女優名・キーワードで検索..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn">検索</button>
          </form>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-inner">
          {GENRES.map((g) => (
            <a
              key={g.label}
              href={`/?q=${encodeURIComponent(g.keyword)}`}
              className={`nav-link ${router.query.q === g.keyword ? 'active' : ''}`}
            >
              {g.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="footer-warning">
          ※ このサイトはアダルト向けです。18歳未満の方のアクセスはご遠慮ください。
        </div>
        当サイトはFANZAのアフィリエイトプログラムに参加しています。<br />
        画像・商品情報はFANZA（DMM）より取得しています。<br />
        <a href="https://affiliate.dmm.com" target="_blank" rel="noopener noreferrer">DMM アフィリエイト</a>
      </footer>
    </>
  )
}

export { GENRES }
