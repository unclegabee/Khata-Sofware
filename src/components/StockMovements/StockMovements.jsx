import './StockMovements.css'

export default function StockMovements() {
  return (
    <section className="stock-movements">
      <h2>Stock movements</h2>
      <div className="stock-movements-table-wrap">
        <table className="stock-movements-table">
          <thead><tr><th>Date</th><th>Product</th><th>Quantity change</th><th>Reference</th></tr></thead>
          <tbody><tr><td colSpan="4">Nothing here yet.</td></tr></tbody>
        </table>
      </div>
    </section>
  )
}
