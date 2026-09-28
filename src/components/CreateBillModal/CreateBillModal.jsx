import './CreateBillModal.css'
import { useState } from 'react'
import { sampleProducts } from '../../data/sampleData.js'

const initialItem = () => ({
  id: `item-${Date.now()}-${Math.random()}`,
  name: 'Printed Lawn Suit',
  shade: 'Sky blue',
  quantity: 12,
  price: 2000,
})

const initialItem2 = () => ({
  id: `item-${Date.now() + 1}-${Math.random()}`,
  name: 'Cotton Embroidered Suit',
  shade: 'Dusty rose',
  quantity: 8,
  price: 1500,
})

export default function CreateBillModal({ customers = [], onClose, onSave, nextInvoiceNumber }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'custom')
  const [customerName, setCustomerName] = useState(customers[0]?.name || 'Ali Traders')
  const [customerPhone, setCustomerPhone] = useState(customers[0]?.phone || '0300 1234567')
  const [customerAddress, setCustomerAddress] = useState(customers[0]?.address || '')
  const [padInvoiceNumber, setPadInvoiceNumber] = useState('')
  const [billDate, setBillDate] = useState(() => new Date().toISOString().slice(0, 10))

  const [items, setItems] = useState([initialItem(), initialItem2()])
  const [discount, setDiscount] = useState(0)
  const [cashPaid, setCashPaid] = useState(20000)
  const [bankPaid, setBankPaid] = useState(0)
  const [chequePaid, setChequePaid] = useState(0)

  const handleCustomerChange = (customerId) => {
    setSelectedCustomerId(customerId)
    if (customerId === 'walk-in') {
      setCustomerName('Walk-in customer')
      setCustomerPhone('')
      setCustomerAddress('')
    } else if (customerId === 'custom') {
      setCustomerName('')
      setCustomerPhone('')
      setCustomerAddress('')
    } else {
      const found = customers.find((c) => c.id === customerId)
      if (found) {
        setCustomerName(found.name)
        setCustomerPhone(found.phone || '')
        setCustomerAddress(found.address || found.city || '')
      }
    }
  }

  const loadSampleBill = () => {
    setSelectedCustomerId(customers[0]?.id || 'AT')
    setCustomerName('Ali Traders')
    setCustomerPhone('0300 1234567')
    setCustomerAddress('')
    setPadInvoiceNumber('')
    setItems([
      {
        id: `item-${Date.now()}-1`,
        name: 'Printed Lawn Suit',
        shade: 'Sky blue',
        quantity: 12,
        price: 2000,
      },
      {
        id: `item-${Date.now()}-2`,
        name: 'Cotton Embroidered Suit',
        shade: 'Dusty rose',
        quantity: 8,
        price: 1500,
      },
    ])
    setDiscount(1000)
    setCashPaid(20000)
    setBankPaid(0)
    setChequePaid(0)
  }

  const handleItemChange = (id, field, value) => {
    setItems((curr) =>
      curr.map((item) => {
        if (item.id !== id) return item
        if (field === 'preset') {
          const product = sampleProducts.find((p) => p.name === value)
          if (product) {
            return { ...item, name: product.name, shade: product.shade, price: product.price }
          }
          return { ...item, name: value }
        }
        return {
          ...item,
          [field]: field === 'quantity' || field === 'price' ? Number(value) || 0 : value,
        }
      }),
    )
  }

  const addItem = () => {
    setItems((curr) => [
      ...curr,
      {
        id: `item-${Date.now()}-${Math.random()}`,
        name: 'Premium Linen Suit',
        shade: 'Olive green',
        quantity: 1,
        price: 2600,
      },
    ])
  }

  const removeItem = (id) => {
    if (items.length <= 1) return
    setItems((curr) => curr.filter((i) => i.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const total = Math.max(0, subtotal - Number(discount || 0))
  const totalPaid = Number(cashPaid || 0) + Number(bankPaid || 0)
  const due = Math.max(0, total - totalPaid)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!items.length) return

    const dueParts = billDate.split('-')
    let defaultDueDate = ''
    if (dueParts.length === 3) {
      const d = new Date(Number(dueParts[0]), Number(dueParts[1]) - 1, Number(dueParts[2]))
      d.setDate(d.getDate() + 7)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      defaultDueDate = `${y}-${m}-${day}`
    }

    const newBill = {
      id: `bill-${Date.now()}`,
      number: nextInvoiceNumber || `INV-${1053 + Math.floor(Math.random() * 100)}`,
      date: billDate,
      paymentDue: defaultDueDate,
      customer: customerName || 'Walk-in customer',
      customerPhone: customerPhone || '',
      customerAddress: customerAddress || '',
      padInvoiceNumber: padInvoiceNumber.trim(),
      customerDetails: {
        id: selectedCustomerId,
        name: customerName || 'Walk-in customer',
        phone: customerPhone || '',
        address: customerAddress || '',
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name.trim(),
        shade: i.shade.trim(),
        quantity: Number(i.quantity) || 1,
        price: Number(i.price) || 0,
      })),
      subtotal,
      discount: Number(discount) || 0,
      total,
      payments: {
        cash: Number(cashPaid) || 0,
        bank: Number(bankPaid) || 0,
        cheque: Number(chequePaid) || 0,
      },
      paid: totalPaid,
      due,
    }

    onSave(newBill)
  }

  return (
    <div className="create-bill-backdrop" onClick={onClose}>
      <div className="create-bill-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create new bill">
        <div className="create-bill-header">
          <div>
            <h2>Create bill &amp; receipt</h2>
            <p className="create-bill-sub">Create and preview a wholesale sales receipt.</p>
          </div>
          <button className="create-bill-close" type="button" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        <div className="create-bill-top-actions">
          <button type="button" className="sample-load-btn" onClick={loadSampleBill}>
            ⚡ Load sample bill (INV-1052 · Ali Traders)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-bill-form">
          <div className="create-bill-section">
            <h3 className="section-title">Customer &amp; invoice info</h3>
            <div className="create-bill-grid">
              <label>
                Select customer
                <select value={selectedCustomerId} onChange={(e) => handleCustomerChange(e.target.value)}>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} {c.phone ? `(${c.phone})` : ''}</option>
                  ))}
                  <option value="walk-in">Walk-in customer</option>
                  <option value="custom">Other / Custom customer</option>
                </select>
              </label>

              <label>
                Customer name
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ali Traders"
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                />
              </label>

              <label>
                Pad invoice number (optional)
                <input
                  type="text"
                  value={padInvoiceNumber}
                  onChange={(e) => setPadInvoiceNumber(e.target.value)}
                  placeholder="e.g. PAD-8812"
                />
              </label>

              <label>
                Bill date
                <input
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  required
                />
              </label>

              <label>
                Address (optional)
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="e.g. Lahore, Faisalabad..."
                />
              </label>
            </div>
          </div>

          <div className="create-bill-section">
            <div className="section-header-row">
              <h3 className="section-title">Bill line items</h3>
              <button type="button" className="add-item-row-btn" onClick={addItem}>+ Add item</button>
            </div>

            <div className="items-table-wrap">
              <table className="create-items-table">
                <thead>
                  <tr>
                    <th>Item article</th>
                    <th>Shade / Colour</th>
                    <th style={{ width: '90px' }}>Qty</th>
                    <th style={{ width: '130px' }}>Rate (Rs.)</th>
                    <th style={{ width: '130px', textAlign: 'right' }}>Total</th>
                    <th style={{ width: '40px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          placeholder="Item name"
                          list="product-presets"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.shade}
                          onChange={(e) => handleItemChange(item.id, 'shade', e.target.value)}
                          placeholder="e.g. Sky blue, Dusty rose"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                          min="1"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                          min="0"
                          required
                        />
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>
                        Rs. {(item.quantity * item.price).toLocaleString()}
                      </td>
                      <td>
                        {items.length > 1 && (
                          <button
                            type="button"
                            className="remove-row-btn"
                            onClick={() => removeItem(item.id)}
                            title="Remove item"
                          >
                            ×
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <datalist id="product-presets">
                {sampleProducts.map((p) => (
                  <option key={p.name} value={p.name}>{p.name} ({p.shade}) - Rs. {p.price}</option>
                ))}
              </datalist>
            </div>
          </div>

          <div className="create-bill-section">
            <h3 className="section-title">Payment &amp; totals</h3>
            <div className="payment-grid">
              <div className="payment-inputs">
                <label>
                  Discount (Rs.)
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    min="0"
                  />
                </label>
                <label>
                  Cash payment (Rs.)
                  <input
                    type="number"
                    value={cashPaid}
                    onChange={(e) => setCashPaid(Number(e.target.value) || 0)}
                    min="0"
                  />
                </label>
                <label>
                  Bank transfer (Rs.)
                  <input
                    type="number"
                    value={bankPaid}
                    onChange={(e) => setBankPaid(Number(e.target.value) || 0)}
                    min="0"
                  />
                </label>
              </div>

              <div className="bill-summary-card">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <strong>Rs. {subtotal.toLocaleString()}</strong>
                </div>
                {discount > 0 && (
                  <div className="summary-line discount-line">
                    <span>Discount</span>
                    <strong>− Rs. {discount.toLocaleString()}</strong>
                  </div>
                )}
                <div className="summary-line grand-total">
                  <span>Total bill</span>
                  <strong>Rs. {total.toLocaleString()}</strong>
                </div>
                <div className="summary-line">
                  <span>Total paid</span>
                  <strong>Rs. {totalPaid.toLocaleString()}</strong>
                </div>
                <div className="summary-line due-line">
                  <span>Due at sale</span>
                  <strong>Rs. {due.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="create-bill-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save &amp; view bill receipt →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
