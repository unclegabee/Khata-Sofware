import './BillReceipt.css'

export default function BillReceipt({ bill, onClose }) {
  if (!bill) return null

  const customer = bill.customerDetails ?? {
    name: bill.customer || 'Walk-in customer',
    phone: bill.customerPhone,
    address: bill.customerAddress,
    city: bill.customerCity,
  }
  const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString()}`

  const subtotal = bill.subtotal ?? bill.items?.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? bill.total ?? 0
  const discount = Number(bill.discount || 0)
  const total = Number(bill.total ?? (subtotal - discount))
  const cash = Number(bill.payments?.cash ?? bill.paid ?? 0)
  const bank = Number(bill.payments?.bank ?? 0)
  const due = Number(bill.due ?? Math.max(0, total - cash - bank))

  const calculateDueDate = (dateString) => {
    if (!dateString) return ''
    try {
      const parts = dateString.split('-')
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
        d.setDate(d.getDate() + 7)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
      }
      return dateString
    } catch {
      return ''
    }
  }

  const paymentDueDate = bill.paymentDue || bill.paymentDueDate || calculateDueDate(bill.date) || '2026-09-25'

  return (
    <main className="receipt-page">
      <div className="receipt-toolbar">
        <h1>Bill receipt</h1>
        <button className="receipt-close" type="button" aria-label="Close receipt" onClick={onClose}>×</button>
      </div>

      <article className="receipt-paper">
        <div className="receipt-customer-details">
          <div>Pad invoice: {bill.padInvoiceNumber || bill.paidInvoiceNumber || '—'}</div>
          <div>Phone: {customer.phone || '—'}</div>
          <div>Address: {[customer.address, customer.city].filter(Boolean).join(', ') || '—'}</div>
        </div>

        <header className="receipt-brand">
          <h2>Kapra Khata</h2>
          <p>Wholesale clothing · Sales receipt</p>
        </header>

        <div className="receipt-meta">
          <strong>{bill.number}</strong>
          <time>{bill.date}</time>
        </div>
        <p className="receipt-customer-name">Customer: {customer.name || bill.customer}</p>

        <div className="receipt-table-wrap">
          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items?.length ? (
                bill.items.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>
                      <div className="receipt-item-title">{item.name}</div>
                      {(item.shade || item.colour || item.color || item.variant || item.description) && (
                        <div className="receipt-item-shade">
                          {item.shade || item.colour || item.color || item.variant || item.description}
                        </div>
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{money(Math.abs(item.price))}</td>
                    <td>{money(item.quantity * item.price)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{bill.customer} purchase</td>
                  <td>1</td>
                  <td>{money(total)}</td>
                  <td>{money(total)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="receipt-bottom-divider" />

        <div className="receipt-summary-block">
          {discount > 0 && (
            <p className="receipt-summary-row">
              Discount: {money(discount)}
            </p>
          )}

          <p className="receipt-summary-row receipt-total-row">
            <strong>Total: {money(total)}</strong>
          </p>

          <p className="receipt-summary-row">
            Paid: {money(cash + bank)} · Due at sale: {money(due)}
          </p>

          <p className="receipt-summary-row">
            Payment due: {paymentDueDate}
          </p>
        </div>

        <p className="receipt-shukriya">Shukriya! Apna bill sambhal kar rakhein.</p>
      </article>

      <div className="receipt-actions-bottom">
        <button type="button" className="receipt-btn-close" onClick={onClose}>
          Close
        </button>
        <button type="button" className="receipt-btn-print" onClick={() => window.print()}>
          Print receipt
        </button>
      </div>
    </main>
  )
}