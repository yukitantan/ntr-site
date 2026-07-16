import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const CATEGORIES = [
  { label: '🔥 人気総合', type: 'doujin', keyword: 'NTR 寝取られ', sort: 'rank' },
  { label: '📚 NTR同人誌', type: 'doujin', keyword: '寝取られ', sort: 'rank' },
  { label: '新着同人', type: 'doujin', keyword: 'NTR', sort: 'date' },
  { label: '人妻NTR', type: 'doujin', keyword: '人妻 寝取られ', sort: 'rank' },
  { label: '🎮 NTR同人ゲーム', type: 'game', keyword: '寝取られ', sort: 'rank' },
  { label: '── 作家・サークル ──', type: 'doujin', keyword: 'NTR 寝取られ', sort: 'rank' },
  { label: '📖 山文京伝', type: 'manga', keyword: '山文京伝', sort: 'rank' },
  { label: '空上', type: 'doujin', keyword: '空上 寝取られ', sort: 'rank' },
  { label: 'HGTラボ', type: 'doujin', keyword: 'HGTラボ', sort: 'rank' },
  { label: 'ひげふらい', type: 'doujin', keyword: 'ひげふらい', sort: 'rank' },
  { label: 'ひらひら', type: 'doujin', keyword: 'ひらひら', sort: 'rank' },
  { label: 'あらくれ', type: 'doujin', keyword: 'あらくれ', sort: 'rank' },
  { label: 'はいとくのもり', type: 'doujin', keyword: 'はいとくのもり', sort: 'rank' },
  { label: 'はいとく先生', type: 'doujin', keyword: 'はいとく先生', sort: 'rank' },
  { label: 'チーム☆ラッキー', type: 'doujin', keyword: 'チーム☆ラッキー', sort: 'rank' },
  { label: '落運', type: 'doujin', keyword: '落運', sort: 'rank' },
  { label: 'にぎりうさぎ', type: 'doujin', keyword: 'にぎりうさぎ', sort: 'rank' },
  { label: 'N.R.D.WORKS', type: 'doujin', keyword: 'N.R.D.WORKS', sort: 'rank' },
  { label: '月面宙返り', type: 'doujin', keyword: '月面宙返り', sort: 'rank' },
  { label: 'Ver9', type: 'doujin', keyword: 'Ver9', sort: 'rank' },
  { label: 'ベコ太郎', type: 'doujin', keyword: 'ベコ太郎', sort: 'rank' },
  { label: '笹森トモエ', type: 'doujin', keyword: '笹森トモエ', sort: 'rank' },
  { label: '黒犬獣', type: 'doujin', keyword: '黒犬獣', sort: 'rank' },
  { label: '黄金紳士倶楽部', type: 'doujin', keyword: '黄金紳士倶楽部', sort: 'rank' },
  { label: 'ホテルニューメメ', type: 'doujin', keyword: 'ホテルニューメメ', sort: 'rank' },
  { label: 'ナナシノベル', type: 'doujin', keyword: 'ナナシノベル', sort: 'rank' },
  { label: 'チョコロ', type: 'doujin', keyword: 'チョコロ', sort: 'rank' },
  { label: 'outerworld', type: 'doujin', keyword: 'outerworld', sort: 'rank' },
  { label: 'iris art', type: 'doujin', keyword: 'iris art', sort: 'rank' },
  { label: 'せなか', type: 'doujin', keyword: 'せなか 義理', sort: 'rank' },
  { label: '織田NON', type: 'doujin', keyword: '織田NON', sort: 'rank' },
  { label: '竜太', type: 'doujin', keyword: '竜太', sort: 'rank' },
  { label: '── 電子書籍 ──', type: 'manga', keyword: 'NTR 寝取られ', sort: 'rank' },
  { label: '色白好', type: 'manga', keyword: '色白好', sort: 'rank' },
  { label: '艶々', type: 'manga', keyword: '艶々', sort: 'rank' },
  { label: '懺悔', type: 'manga', keyword: '懺悔', sort: 'rank' },
  { label: 'あらくれ(書籍)', type: 'manga', keyword: 'あらくれ', sort: 'rank' },
  { label: '織田NON(書籍)', type: 'manga', keyword: '織田NON', sort: 'rank' },
  { label: '竜太(書籍)', type: 'manga', keyword: '竜太', sort: 'rank' },
  { label: 'すぎぢー', type: 'manga', keyword: 'すぎぢー', sort: 'rank' },
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
