import './EmptyOrdersTable.css'

export default function EmptyOrdersTable({ bills, onResume, onDiscard }) {
  return <div className="orders-table-wrap"><table className="orders-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    {bills.length ? bills.map((bill, index) => <tr key={bill.id}><th scope="row">DRAFT-{index + 1}</th><td>{bill.customerId === 'walk-in' ? 'Walk-in customer' : 'Customer'}</td><td>{bill.date}</td><td>{bill.items.length}</td><td>Rs. {bill.total.toLocaleString()}</td><td>Held</td><td><button type="button" onClick={() => onResume(bill)}>Resume</button><button type="button" onClick={() => onDiscard(bill.id)}>Remove</button></td></tr>) : <tr><td colSpan="7">Nothing here yet.</td></tr>}
  </tbody></table></div>
}
