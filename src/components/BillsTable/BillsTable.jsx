import './BillsTable.css'
import { useState } from 'react'
import { initialBills } from '../../data/sampleData.js'
import BillReceipt from '../../pages/bill-receipt/BillReceipt.jsx'

export default function BillsTable({ bills = [], onReturn, onViewBill }) {
  const [localViewingBill, setLocalViewingBill] = useState(null)

  const displayedBills = bills.length ? bills : initialBills

  const handleView = (bill) => {
    if (onViewBill) {
      onViewBill(bill)
    } else {
      setLocalViewingBill(bill)
    }
  }

  return (
    <>
      <div className="bills-table-wrap">
        <table className="bills-table">
          <thead>
            <tr>
              <th>Bill</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due at sale</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {displayedBills.length ? (
              displayedBills.map((bill) => (
                <tr key={bill.number}>
                  <th scope="row">{bill.number}</th>
                  <td>{bill.customer}</td>
                  <td>{bill.date}</td>
                  <td>Rs. {Number(bill.total || 0).toLocaleString()}</td>
                  <td>Rs. {Number(bill.paid || 0).toLocaleString()}</td>
                  <td>Rs. {Number(bill.due || 0).toLocaleString()}</td>
                  <td className="bill-actions">
                    <button
                      type="button"
                      className="bill-view-btn"
                      onClick={() => handleView(bill)}
                      title="View & print sales receipt"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="bill-return-btn"
                      onClick={onReturn}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No bills match this search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {localViewingBill && (
        <div className="receipt-modal-backdrop" onClick={() => setLocalViewingBill(null)}>
          <div className="receipt-modal-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Bill receipt">
            <BillReceipt bill={localViewingBill} onClose={() => setLocalViewingBill(null)} />
          </div>
        </div>
      )}
    </>
  )
}
