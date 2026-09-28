import { useEffect, useState } from 'react'
import './NewSale.css'
import CustomerInvoice from '../../components/CustomerInvoice/CustomerInvoice.jsx'
import CurrentCart from '../../components/CurrentCart/CurrentCart.jsx'
import AddItem from '../../components/AddItem/AddItem.jsx'
import Payment from '../../components/Payment/Payment.jsx'

export default function NewSale({ customers, bills = [], selectedCustomerId, onCustomerChange, onNewCustomer, onSaveBill, onHoldBill, initialDraft, onDraftLoaded }) {
  const [items, setItems] = useState(() => initialDraft?.items ?? [])
  const [discount, setDiscount] = useState(() => initialDraft?.discount ?? 0)
  const [payments, setPayments] = useState(() => initialDraft?.payments ?? { cash: 0, bank: 0, cheque: 0 })
  const [cashWasEdited, setCashWasEdited] = useState(() => Number(initialDraft?.payments?.cash || 0) > 0)
  const [saleMessage, setSaleMessage] = useState('')
  const [paidInvoiceNumber, setPaidInvoiceNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (initialDraft) onDraftLoaded?.()
  }, [initialDraft, onDraftLoaded])

  useEffect(() => {
    const customer = customers.find((entry) => entry.id === selectedCustomerId)
    setPhone(customer?.phone ?? '')
    setAddress(customer?.address ?? '')
  }, [customers, selectedCustomerId])

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const total = Math.max(0, subtotal - discount)

  useEffect(() => {
    if (cashWasEdited) return
    const defaultCash = Math.max(0, total - payments.bank - payments.cheque)
    setPayments((currentPayments) => currentPayments.cash === defaultCash
      ? currentPayments
      : { ...currentPayments, cash: defaultCash })
  }, [cashWasEdited, total, payments.bank, payments.cheque])

  const clearSale = () => {
    setItems([])
    setDiscount(0)
    setPayments({ cash: 0, bank: 0, cheque: 0 })
    setCashWasEdited(false)
  }

  const changePayment = (method, value) => {
    setPayments((currentPayments) => ({ ...currentPayments, [method]: value }))
    if (method === 'cash') setCashWasEdited(true)
  }

  const addItem = (item) => {
    setItems((currentItems) => [...currentItems, { ...item, id: `${Date.now()}-${Math.random()}` }])
    setSaleMessage('')
  }

  const addReturn = ({ code, quantity, condition }) => {
    const normalizedCode = code.trim().toLowerCase()
    const matchesCode = (item) => [item.code, item.articleNumber, item.id, item.name]
      .filter(Boolean)
      .some((value) => String(value).trim().toLowerCase() === normalizedCode)
    const billedItem = bills
      .filter((bill) => bill.customerId === selectedCustomerId)
      .flatMap((bill) => bill.items ?? [])
      .find(matchesCode)
    const currentItem = items.find(matchesCode)
    const amount = Math.abs(Number(billedItem?.price ?? currentItem?.price ?? 0))

    setItems((currentItems) => [...currentItems, {
      id: `${Date.now()}-${Math.random()}`,
      name: `Return · ${code} (${condition})`,
      returnCode: code,
      returnCondition: condition,
      quantity,
      price: -amount,
      returnQuantity: quantity,
      isReturn: true,
    }])
    if (!amount) setSaleMessage('Return added; the item rate was not found, so no amount was deducted.')
  }

  const saveBill = (bill) => {
    const cash = Math.min(payments.cash, bill.total)
    const bank = Math.min(payments.bank, Math.max(0, bill.total - cash))
    const cheque = Math.min(payments.cheque, Math.max(0, bill.total - cash - bank))
    onSaveBill({ ...bill, payments: { cash, bank, cheque }, customerId: selectedCustomerId, paidInvoiceNumber, padInvoiceNumber: paidInvoiceNumber, customerPhone: phone, customerAddress: address })
  }

  const holdBill = () => {
    onHoldBill({ items, discount, total, payments, customerId: selectedCustomerId })
    setSaleMessage('Bill held.')
    clearSale()
  }

  const handleClear = () => {
    if (window.confirm('Clear all items and payment amounts from this sale?')) {
      clearSale()
      setSaleMessage('Sale cleared.')
    }
  }

  return (
    <main className="workspace">
      <div className="workspace-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>New sale</h1>
          <p className="workflow">Search <span>→</span> Enter <span>→</span> quantity <span>→</span> Enter <span>→</span> price <span>→</span> Enter</p>
        </div>
        <div className="draft-pill">Draft · 2026-09-26</div>
      </div>
      <div className="sale-grid">
        <div className="sale-main"><CustomerInvoice
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onCustomerChange={onCustomerChange}
          onNewCustomer={onNewCustomer}
          paidInvoiceNumber={paidInvoiceNumber}
          onPaidInvoiceNumberChange={setPaidInvoiceNumber}
          phone={phone}
          onPhoneChange={setPhone}
          address={address}
          onAddressChange={setAddress}
        /><AddItem onAddItem={addItem} /><Payment
          total={total}
          payments={payments}
          onChange={changePayment}
        /></div>
        <div>
          {saleMessage && <p className="sale-status" role="status">{saleMessage}</p>}
          <CurrentCart
            items={items}
            discount={discount}
            onDiscountChange={setDiscount}
            onAddReturn={addReturn}
            onRemoveItem={(id) => setItems((currentItems) => currentItems.filter((item) => item.id !== id))}
            onSaveBill={(bill) => saveBill({ ...bill, paidInvoiceNumber, customerPhone: phone, customerAddress: address })}
            onHoldBill={holdBill}
            onClear={handleClear}
          />
        </div>
      </div>
    </main>
  )
}
