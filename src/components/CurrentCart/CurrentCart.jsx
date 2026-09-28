import './CurrentCart.css'

export default function CurrentCart({ items, discount, onDiscountChange, onAddReturn, onRemoveItem, onSaveBill, onHoldBill, onClear }) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const total = Math.max(0, subtotal - discount)
  const saleItems = items.filter((item) => !item.isReturn && !item.returnQuantity)
  const returnItems = items.filter((item) => item.isReturn || item.returnQuantity)
  const itemCount = saleItems.reduce((sum, item) => sum + item.quantity, 0)
  const returnCount = returnItems.length

  const handleReturn = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onAddReturn({
      code: formData.get('returnCode').trim(),
      quantity: Number(formData.get('returnQuantity')),
      condition: formData.get('condition'),
    })
    event.currentTarget.reset()
  }

  return (
    <section className="cart-panel">
      <div className="panel-heading">
        <h2>Current cart</h2>
        <span className="count-badge">{itemCount} suits</span>
      </div>
      {saleItems.length ? <div className="cart-item-list">{saleItems.map((item) => <div className="cart-item" key={item.id}>
        <span>
          <strong>{item.name}</strong>
          <small>{item.quantity} × Rs. {Math.abs(item.price).toLocaleString()}</small>
        </span>
        <strong>Rs. {(item.quantity * item.price).toLocaleString()}</strong>
        <button type="button" aria-label={`Remove ${item.name}`} onClick={() => onRemoveItem(item.id)}>×</button>
      </div>)}</div> : <p className="empty-cart">Your added items will appear here.</p>}
      <div className="returns-box">
        <div className="returns-heading">
          <h3>Return item from this<br />customer</h3>
          <span className="count-badge">{returnCount} {returnCount === 1 ? 'return' : 'returns'}</span>
        </div>
        <p>Make the bill first, then enter the item code. The original rate will be deducted.</p>
        <form className="return-fields" onSubmit={handleReturn}>
          <label>Item code<input name="returnCode" placeholder="Scan or type pr" required /></label>
          <label>Quantity<input name="returnQuantity" type="number" defaultValue="1" min="1" required /></label>
          <label>Condition
            <select name="condition" defaultValue="sellable">
              <option value="sellable">Sellable stock</option>
              <option value="damaged">Damaged</option>
              <option value="defective">Defective</option>
              <option value="other">Other</option>
            </select>
          </label>
          <button className="primary-button" type="submit">Add return</button>
        </form>
        {returnItems.length > 0 && <ul className="return-items-list" aria-label="Added return items">
          {returnItems.map((item) => <li className="return-item-row" key={item.id}>
            <span><strong>{item.returnCode || item.name}</strong><small>{item.quantity} {item.quantity === 1 ? 'item' : 'items'} · {item.returnCondition}</small></span>
            <strong>Rs. {(item.quantity * Math.abs(item.price)).toLocaleString()}</strong>
            <button type="button" aria-label={`Remove return ${item.returnCode || item.name}`} onClick={() => onRemoveItem(item.id)}>×</button>
          </li>)}
        </ul>}
      </div>
      <div className="cart-totals">
        <div><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString()}</strong></div>
        <label>Discount<input type="number" value={discount} onChange={(event) => onDiscountChange(Number(event.target.value))} min="0" max={Math.max(0, subtotal)} /></label>
      </div>
      <div className="total-bill">
        <span>Total bill</span>
        <strong>Rs. {total.toLocaleString()}</strong>
      </div>
      <div className="cart-actions">
        <button className="primary-button" type="button" disabled={!items.length} onClick={() => onSaveBill({ subtotal, discount, total, items })}>Save &amp; preview bill →</button>
        <div><button type="button" disabled={!items.length} onClick={onHoldBill}>Hold bill</button><button type="button" disabled={!items.length} onClick={onClear}>Clear</button></div>
      </div>
    </section>
  )
}
