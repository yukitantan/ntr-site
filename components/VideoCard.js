function Stars({ count, average }) {
  if (!count) return null
  const avg = parseFloat(average) || 0
  const full = Math.round(avg)
  return (
    <div className="stars">
      {[1,2,3,4,5].map((i) => (
        <span key={i} className={`star ${i <= full ? '' : 'empty'}`}>★</span>
      ))}
      <span className="rating-count">({count}件)</span>
    </div>
  )
}

const TYPE_LABEL = {
  doujin: '同人',
  manga: 'エロ漫画',
  game: '同人ゲーム',
}

export default function VideoCard({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="card">
      <div className="card-img-wrap">
        <img
          src={item.image || item.thumb}
          alt={item.title}
          className="card-img"
          loading="lazy"
          onError={(e) => { e.target.style.background = '#f1f3f5' }}
        />
        <span className="card-category">{TYPE_LABEL[item.type] || '同人'}</span>
      </div>
      <div className="card-body">
        {item.circle && <div className="card-circle">{item.circle}</div>}
        <div className="card-title">{item.title}</div>
        <Stars count={item.review?.count} average={item.review?.average} />
        <div className="card-meta">
          {item.date?.substring(0, 7)}
          {item.price ? ` · ${item.price}` : ''}
        </div>
        {item.genre.length > 0 && (
          <div className="tags">
            {item.genre.slice(0, 4).map((g) => (
              <span key={g} className="tag">{g}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
