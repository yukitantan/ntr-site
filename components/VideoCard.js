export default function VideoCard({ item }) {
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="card">
      <img
        src={item.image || item.thumb}
        alt={item.title}
        className="card-img"
        loading="lazy"
        onError={(e) => { e.target.style.display = 'none' }}
      />
      <div className="card-body">
        {item.actress.length > 0 && (
          <div className="card-actress">{item.actress.slice(0, 2).join(' / ')}</div>
        )}
        <div className="card-title">{item.title}</div>
        <div className="card-meta">{item.date?.substring(0, 7)}{item.price ? ` · ${item.price}` : ''}</div>
        {item.genre.length > 0 && (
          <div className="tags">
            {item.genre.slice(0, 3).map((g) => (
              <span key={g} className="tag">{g}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}
