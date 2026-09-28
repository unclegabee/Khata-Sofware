import './StockStats.css'

export default function StockStats({ stats }) {
  return <div className="stock-stats">{stats.map(([label, value]) => <div className="stock-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
}
