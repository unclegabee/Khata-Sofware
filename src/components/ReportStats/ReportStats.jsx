import './ReportStats.css'

const stats = [['Net sales', 'Rs. 35,000'], ['Estimated gross profit', 'Rs. 10,200'], ['Customer receivables', 'Rs. 33,500'], ['Supplier payables', 'Rs. 106,000']]

export default function ReportStats() { return <div className="report-stats">{stats.map(([label, value]) => <div className="report-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div> }
