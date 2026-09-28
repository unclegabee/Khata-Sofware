import './IncomeSpending.css'

const rows = [['Gross billed', 'Rs. 35,000'], ['Returns', 'Rs. 0'], ['Estimated cost of goods', 'Rs. -24,800'], ['Shop expenses', 'Rs. 0'], ['Estimated net result', 'Rs. 10,200']]

export default function IncomeSpending() { return <section className="income-panel"><h2>Income &amp; spending</h2><div className="income-rows">{rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><p>Management estimate. Defect recoveries and tax adjustments require accountant review.</p></section> }
