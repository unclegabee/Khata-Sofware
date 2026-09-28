import './CustomerReturns.css'
import { useState } from 'react'
import { initialBills, initialReturns } from '../../data/sampleData.js'

export default function CustomerReturns({ bills = [], customers = [], onReturnProcessed }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBill, setSelectedBill] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [returnQuantity, setReturnQuantity] = useState(1)
  const [condition, setCondition] = useState('sellable')
  const [refundType, setRefundType] = useState('khata')
  const [returnsList, setReturnsList] = useState(initialReturns)
  const [successMessage, setSuccessMessage] = useState('')

  const availableBills = bills.length ? bills : initialBills

  const filteredBills = availableBills.filter((bill) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    const num = (bill.number || '').toLowerCase()
    const name = (bill.customer || '').toLowerCase()
    const phone = (bill.customerDetails?.phone || bill.customerPhone || '').toLowerCase()
    return num.includes(q) || name.includes(q) || phone.includes(q)
  })

  const handleSelectBill = (bill) => {
    setSelectedBill(bill)
    setSelectedItemIndex(0)
    setReturnQuantity(1)
    setSuccessMessage('')
  }

  const handleProcessReturn = (e) => {
    e.preventDefault()
    if (!selectedBill) return

    const currentItem = selectedBill.items?.[selectedItemIndex] || {
      name: 'Suit Article',
      shade: '',
      price: 1500,
      quantity: 1,
    }

    const qty = Math.min(Number(returnQuantity) || 1, currentItem.quantity || 1)
    const refundAmount = qty * Math.abs(currentItem.price || 0)
    const newReturnId = `RET-${100 + returnsList.length + 1}`
    const today = new Date().toISOString().slice(0, 10)

    const returnRecord = {
      id: newReturnId,
      number: newReturnId,
      originalBill: selectedBill.number,
      date: today,
      customer: selectedBill.customer,
      item: `${currentItem.name}${currentItem.shade ? ` · ${currentItem.shade}` : ''} (${qty} suits)`,
      credit: refundType === 'khata' ? `Rs. ${refundAmount.toLocaleString()}` : 'Rs. 0',
      refund: refundType === 'cash' ? `Rs. ${refundAmount.toLocaleString()}` : 'Rs. 0',
    }

    setReturnsList([returnRecord, ...returnsList])
    setSuccessMessage(`Return ${newReturnId} processed successfully! ${refundType === 'khata' ? 'Credited to customer khata.' : 'Refunded in cash.'}`)
    setSelectedBill(null)
    onReturnProcessed?.(returnRecord)
  }

  return (
    <main className="returns-page">
      <div className="returns-top-toggle">
        <button type="button" className="bill-number-toggle">
          ▼ Find by bill number instead
        </button>
      </div>

      <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
      <h1>Customer returns</h1>
      <p className="returns-intro">Start with a bill number, or find the customer's purchase.</p>

      {/* Find original bill search card */}
      <section className="find-bill-card">
        <label className="find-bill-label" htmlFor="returns-bill-search-input">
          Find original bill
        </label>
        <input
          id="returns-bill-search-input"
          className="find-bill-input"
          type="search"
          placeholder="Bill number, customer name or p"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p className="find-bill-hint">
          Select a bill to see its items, suppliers and returnable quantities.
        </p>
      </section>

      {/* Matching Bills Table */}
      <section className="bills-result-card">
        <div className="returns-table-wrap">
          <table className="returns-bills-table">
            <thead>
              <tr>
                <th>BILL</th>
                <th>CUSTOMER</th>
                <th>PURCHASE DATE</th>
                <th>TOTAL</th>
                <th aria-label="Action"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBills.length ? (
                filteredBills.map((bill) => (
                  <tr key={bill.number}>
                    <td className="bill-num-cell">{bill.number}</td>
                    <td>{bill.customer}</td>
                    <td>{bill.date}</td>
                    <td className="bill-total-cell">
                      Rs. {Number(bill.total || 0).toLocaleString()}
                    </td>
                    <td className="bill-action-cell">
                      <button
                        type="button"
                        className="select-bill-btn"
                        onClick={() => handleSelectBill(bill)}
                      >
                        Select bill →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-results-cell">
                    No bills match "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Success notification banner */}
      {successMessage && (
        <div className="return-success-banner" role="status">
          <span>✓ {successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}

      {/* Selected Bill Return Processor Card */}
      {selectedBill && (
        <section className="process-return-card">
          <div className="process-return-header">
            <div>
              <h2>Process return for {selectedBill.number}</h2>
              <p className="process-return-subtitle">
                Customer: <strong>{selectedBill.customer}</strong> · Purchased on {selectedBill.date}
              </p>
            </div>
            <button
              type="button"
              className="close-process-btn"
              onClick={() => setSelectedBill(null)}
              aria-label="Cancel return"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleProcessReturn} className="process-return-form">
            <div className="process-item-selection">
              <label className="field-label">Choose item to return</label>
              <div className="return-items-grid">
                {selectedBill.items?.map((item, index) => (
                  <button
                    key={item.id || index}
                    type="button"
                    className={`return-item-choice ${selectedItemIndex === index ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedItemIndex(index)
                      setReturnQuantity(1)
                    }}
                  >
                    <strong>{item.name}</strong>
                    {item.shade && <span className="choice-shade">{item.shade}</span>}
                    <span className="choice-meta">
                      Purchased: {item.quantity} suits @ Rs. {item.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="process-fields-row">
              <label>
                Return quantity
                <input
                  type="number"
                  min="1"
                  max={selectedBill.items?.[selectedItemIndex]?.quantity || 1}
                  value={returnQuantity}
                  onChange={(e) => setReturnQuantity(e.target.value)}
                  required
                />
              </label>

              <label>
                Condition
                <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                  <option value="sellable">Sellable stock (Restock)</option>
                  <option value="damaged">Damaged / Defective (Quarantine)</option>
                </select>
              </label>

              <label>
                Refund adjustment
                <select value={refundType} onChange={(e) => setRefundType(e.target.value)}>
                  <option value="khata">Credit to customer khata (Jama karein)</option>
                  <option value="cash">Cash refund from cash drawer</option>
                </select>
              </label>
            </div>

            <div className="process-summary-box">
              <span>
                Total refund/credit amount:{' '}
                <strong>
                  Rs.{' '}
                  {(
                    (Number(returnQuantity) || 1) *
                    Math.abs(selectedBill.items?.[selectedItemIndex]?.price || 0)
                  ).toLocaleString()}
                </strong>
              </span>
              <div className="process-form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setSelectedBill(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="confirm-return-btn">
                  Confirm &amp; process return
                </button>
              </div>
            </div>
          </form>
        </section>
      )}

      {/* Previous returns section */}
      <section className="previous-returns-section">
        <h2>Previous returns</h2>
        <div className="returns-table-wrap">
          <table className="previous-returns-table">
            <thead>
              <tr>
                <th>RETURN</th>
                <th>ORIGINAL BILL</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>CREDIT</th>
                <th>REFUND</th>
              </tr>
            </thead>
            <tbody>
              {returnsList.length ? (
                returnsList.map((ret) => (
                  <tr key={ret.id}>
                    <td className="return-id-cell">{ret.id}</td>
                    <td>{ret.originalBill}</td>
                    <td>{ret.date}</td>
                    <td>{ret.customer}</td>
                    <td>{ret.credit}</td>
                    <td>{ret.refund}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-results-cell">
                    No previous returns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
