import './ReceiveStats.css'

export default function ReceiveStats({ stats }) {
  return <div className="receive-stats">{stats.map(([label, value]) => <div className="receive-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
}
