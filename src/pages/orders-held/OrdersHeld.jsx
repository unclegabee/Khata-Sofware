import './OrdersHeld.css'
import EmptyOrdersTable from '../../components/EmptyOrdersTable/EmptyOrdersTable.jsx'

export default function OrdersHeld({ bills, onResume, onDiscard }) {
  return (
    <main className="orders-page">
      <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
      <h1>Orders &amp; held bills</h1>
      <p className="orders-intro">Continue a draft, reserve stock, or convert a quotation.</p>
      <EmptyOrdersTable bills={bills} onResume={onResume} onDiscard={onDiscard} />
    </main>
  )
}
