import './Payment.css'

export default function Payment({ total, payments, onChange }) {
  const received = payments.cash + payments.bank
  const pendingCheque = payments.cheque
  const dueAfterClearance = Math.max(0, total - received - pendingCheque)

  return (
    <section className="payment-panel">
      <h2>Payment · split across methods</h2>
      <div className="payment-grid">
        <label>Cash (optional)<input type="number" value={payments.cash} onChange={(event) => onChange('cash', Number(event.target.value))} min="0" /></label>
        <label>Bank transfer (optional)<input type="number" value={payments.bank} onChange={(event) => onChange('bank', Number(event.target.value))} min="0" /></label>
        <label>Cheque amount (optional)<input type="number" value={payments.cheque} onChange={(event) => onChange('cheque', Number(event.target.value))} min="0" /></label>
      </div>
      <h3 className="cheque-heading">▶ Cheque details (only if cheque amount is entered)</h3>
      <div className="payment-summary">
        <div><span>Cash + bank received</span><strong>Rs. {received.toLocaleString()}</strong></div>
        <div><span>Pending cheque</span><strong>Rs. {pendingCheque.toLocaleString()}</strong></div>
        <div><span>Uncovered balance</span><strong>Rs. {dueAfterClearance.toLocaleString()}</strong></div>
      </div>
      <p className="cheque-note">Khata due until cheque clears: Rs. {Math.max(0, total - received).toLocaleString()}</p>
      <label className="follow-up-date">Due / cheque follow-up date
        <input type="date" />
      </label>
    </section>
  )
}
