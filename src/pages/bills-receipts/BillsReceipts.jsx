import './BillsReceipts.css'
import { useEffect, useState } from 'react'
import BillsTable from '../../components/BillsTable/BillsTable.jsx'
import BillReceipt from '../bill-receipt/BillReceipt.jsx'

export default function BillsReceipts({ bills = [], onNewSale, onReturn }) {
  const [query, setQuery] = useState('')
  const [viewingBill, setViewingBill] = useState(null)

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setViewingBill(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredBills = bills.filter((bill) =>
    `${bill.number} ${bill.customer}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="bills-page">
      <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>

      <div className="bills-heading">
        <div>
          <h1>Bills &amp; receipts</h1>
          <p>Find a bill, reprint it, or process a return.</p>
        </div>

        <div className="bills-heading-actions">
          <button className="new-sale-button" type="button" onClick={onNewSale}>
            + New sale
          </button>
        </div>
      </div>

      <input
        className="bill-search"
        type="search"
        placeholder="Search bill number or customer..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <BillsTable
        bills={filteredBills}
        onReturn={onReturn}
        onViewBill={(bill) => setViewingBill(bill)}
      />

      {/* Bill Receipt Preview Modal */}
      {viewingBill && (
        <div className="receipt-modal-backdrop" onClick={() => setViewingBill(null)}>
          <div
            className="receipt-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Receipt ${viewingBill.number}`}
          >
            <BillReceipt bill={viewingBill} onClose={() => setViewingBill(null)} />
          </div>
        </div>
      )}
    </main>
  )
}
