import { useEffect, useState } from 'react'
import './NewDeliveryModal.css'

const today = () => {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function Field({ label, name, value, onChange, type = 'text', placeholder, options, error, min }) {
  const id = `delivery-${name}`
  return (
    <label className="delivery-field" htmlFor={id}>
      <span>{label}</span>
      {options ? (
        <select id={id} name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)}>
          {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
        </select>
      ) : (
        <input id={id} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} aria-invalid={Boolean(error)} />
      )}
      {error && <small className="delivery-error" role="alert">{error}</small>}
    </label>
  )
}

function AddedStockCard({ items, onRemove }) {
  return (
    <aside className="added-stock-card" aria-label="Added stock">
      <div className="added-stock-heading">
        <h3>Added stock</h3>
        <span className="added-stock-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
      </div>
      {items.length === 0 ? (
        <p className="added-stock-empty">As you add stock, it will appear here.</p>
      ) : (
        <ul className="added-stock-list">
          {items.map((item) => (
            <li className="added-stock-item" key={item.id}>
              <div className="added-stock-item-heading">
                <strong>{item.productName || item.articleNumber || 'Stock item'}</strong>
                <button type="button" aria-label={`Remove ${item.productName || 'stock item'}`} onClick={() => onRemove(item.id)}>×</button>
              </div>
              <span>{item.batchNumber} · {item.size} · {item.quantity} suits</span>
              <small>{item.rackLocation}{item.articleNumber ? ` · Article ${item.articleNumber}` : ''}</small>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default function NewDeliveryModal({ onClose, onSave }) {
  const [supplier, setSupplier] = useState('')
  const [arrivalDate, setArrivalDate] = useState(today())
  const [batchNumber, setBatchNumber] = useState('RCH-B05')
  const [productName, setProductName] = useState('Printed Lawn Suit')
  const [articleNumber, setArticleNumber] = useState('')
  const [size, setSize] = useState('Unstitched')
  const [quantity, setQuantity] = useState('12')
  const [rackLocation, setRackLocation] = useState('Rack A1')
  const [items, setItems] = useState([])
  const [cash, setCash] = useState('0')
  const [bankTransfer, setBankTransfer] = useState('0')
  const [chequeAmount, setChequeAmount] = useState('0')
  const [chequeOpen, setChequeOpen] = useState(false)
  const [chequeNumber, setChequeNumber] = useState('')
  const [chequeDate, setChequeDate] = useState('')
  const [bankName, setBankName] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const addItem = () => {
    const nextErrors = {}
    if (!batchNumber.trim()) nextErrors.batchNumber = 'Enter a batch number.'
    if (!size.trim()) nextErrors.size = 'Enter a size.'
    if (!rackLocation.trim()) nextErrors.rackLocation = 'Enter a rack or location.'
    if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) nextErrors.quantity = 'Quantity must be greater than 0.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setItems((current) => [...current, {
      id: `${Date.now()}-${Math.random()}`,
      batchNumber: batchNumber.trim(),
      productName: productName.trim(),
      articleNumber: articleNumber.trim(),
      size: size.trim(),
      quantity: Number(quantity),
      rackLocation: rackLocation.trim(),
    }])
    setErrors({})
    setProductName('')
    setArticleNumber('')
    setQuantity('12')
  }

  const saveDelivery = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!supplier) nextErrors.supplier = 'Choose a supplier.'
    if (!arrivalDate) nextErrors.arrivalDate = 'Choose an arrival date.'
    if (items.length === 0) nextErrors.items = 'Add at least one stock item before saving.'
    if (Number(cash) < 0 || Number(bankTransfer) < 0 || Number(chequeAmount) < 0) nextErrors.payment = 'Payment amounts cannot be negative.'
    if (Number(chequeAmount) > 0 && (!chequeNumber.trim() || !chequeDate || !bankName.trim())) nextErrors.cheque = 'Enter the cheque number, date and bank name.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const payments = {
      cash: Number(cash) || 0,
      bankTransfer: Number(bankTransfer) || 0,
      cheque: Number(chequeAmount) || 0,
    }
    onSave({
      supplier,
      arrivalDate,
      items,
      payments,
      chequeDetails: payments.cheque > 0 ? { chequeNumber: chequeNumber.trim(), chequeDate, bankName: bankName.trim() } : null,
      createdAt: new Date().toISOString(),
    })
  }

  const amountInput = (label, name, value, onChange) => (
    <label className="delivery-field" htmlFor={`delivery-${name}`}>
      <span>{label}</span>
      <input id={`delivery-${name}`} name={name} type="number" min="0" step="0.01" value={value} onChange={onChange} />
      {errors.payment && <small className="delivery-error" role="alert">{errors.payment}</small>}
    </label>
  )

  return (
    <div className="new-delivery-backdrop">
      <section className="new-delivery-dialog" role="dialog" aria-modal="true" aria-labelledby="new-delivery-title">
        <header className="new-delivery-header">
          <h2 id="new-delivery-title">Receive a new delivery</h2>
          <button type="button" className="new-delivery-close" aria-label="Close new delivery" onClick={onClose}>×</button>
        </header>
        <div className="new-delivery-scroll">
          <div className="new-delivery-layout">
            <form className="new-delivery-form" onSubmit={saveDelivery} noValidate>
              <div className="delivery-top-fields">
                <Field label="Supplier" name="supplier" value={supplier} onChange={(event) => setSupplier(event.target.value)} options={[
                  ['', 'Choose one'], ['Royal Cloth House', 'Royal Cloth House'], ['Fashion Avenue', 'Fashion Avenue'],
                ]} error={errors.supplier} />
                <Field label="Arrival date" name="arrivalDate" type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} error={errors.arrivalDate} />
              </div>

              <div className="delivery-item-fields">
                <Field label="Batch number" name="batchNumber" value={batchNumber} onChange={(event) => setBatchNumber(event.target.value)} placeholder="RCH-B05" error={errors.batchNumber} />
                <Field label="Product name (optional)" name="productName" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="Printed Lawn Suit" />
                <Field label="Article / design number (optional)" name="articleNumber" value={articleNumber} onChange={(event) => setArticleNumber(event.target.value)} placeholder="Leave blank if unavailable" />
                <div className="delivery-size-quantity">
                  <Field label="Size" name="size" value={size} onChange={(event) => setSize(event.target.value)} placeholder="Unstitched" error={errors.size} />
                  <Field label="Quantity (suits)" name="quantity" type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} error={errors.quantity} />
                </div>
                <Field label="Rack / location" name="rackLocation" value={rackLocation} onChange={(event) => setRackLocation(event.target.value)} placeholder="Rack A1" error={errors.rackLocation} />
                <button className="delivery-primary-button" type="button" onClick={addItem}>＋ Add item to delivery</button>
                {errors.items && <small className="delivery-error" role="alert">{errors.items}</small>}
                <p className="delivery-help">Use the batch number, size and rack location to identify stock.</p>
              </div>

              <section className="delivery-payment-section" aria-labelledby="delivery-payment-title">
                <h3 id="delivery-payment-title">Payment to supplier</h3>
                <div className="delivery-payment-fields">
                  {amountInput('Cash (optional)', 'cash', cash, (event) => setCash(event.target.value))}
                  {amountInput('Bank transfer (optional)', 'bankTransfer', bankTransfer, (event) => setBankTransfer(event.target.value))}
                  {amountInput('Cheque amount (optional)', 'chequeAmount', chequeAmount, (event) => {
                    setChequeAmount(event.target.value)
                    if (Number(event.target.value) <= 0) setChequeOpen(false)
                  })}
                </div>
                {Number(chequeAmount) > 0 && (
                  <div className="cheque-details-section">
                    <button className="cheque-details-toggle" type="button" aria-expanded={chequeOpen} onClick={() => setChequeOpen((open) => !open)}>
                      <span aria-hidden="true">{chequeOpen ? '▾' : '▸'}</span> Cheque details (only if cheque amount is entered)
                    </button>
                    {chequeOpen && <div className="cheque-fields">
                      <Field label="Cheque number" name="chequeNumber" value={chequeNumber} onChange={(event) => setChequeNumber(event.target.value)} error={errors.cheque} />
                      <Field label="Cheque date" name="chequeDate" type="date" value={chequeDate} onChange={(event) => setChequeDate(event.target.value)} error={errors.cheque} />
                      <Field label="Bank name" name="bankName" value={bankName} onChange={(event) => setBankName(event.target.value)} error={errors.cheque} />
                    </div>}
                  </div>
                )}
                {errors.cheque && !chequeOpen && <small className="delivery-error" role="alert">{errors.cheque}</small>}
              </section>

              <button className="delivery-primary-button delivery-save-button" type="submit">Save delivery &amp; add stock</button>
            </form>
            <AddedStockCard items={items} onRemove={(id) => setItems((current) => current.filter((item) => item.id !== id))} />
          </div>
        </div>
      </section>
    </div>
  )
}
