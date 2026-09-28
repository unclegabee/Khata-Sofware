import './NonCashSummary.css'

export default function NonCashSummary() {
  return (
    <section className="non-cash-summary">
      <h2>Non-cash summary</h2>
      <div className="non-cash-list"><div><span>Bank movement</span><strong>Rs. 0</strong></div><div><span>Pending cheques</span><strong>Rs. 0</strong></div></div>
      <p>Pending cheques are not included in cash counted or khata settlement until cleared.</p>
    </section>
  )
}
