import './ReceiveStock.css'
import { useEffect, useState } from 'react'
import ReceiveStats from '../../components/ReceiveStats/ReceiveStats.jsx'
import ReceiveTable from '../../components/ReceiveTable/ReceiveTable.jsx'
import NewDeliveryModal from '../../components/NewDeliveryModal/NewDeliveryModal.jsx'

const STORAGE_KEY = 'kapraKhataDeliveries'
const initialRows = [
  ['PUR-201', 'Royal Cloth House', '2026-09-12', 'RCH-B01 · 120 suits', 'Rs. 168,000', 'Rs. 100,000'],
  ['PUR-202', 'Fashion Avenue', '2026-09-15', 'FA-B02 · 80 suits', 'Rs. 80,000', 'Rs. 60,000'],
  ['PUR-203', 'Royal Cloth House', '2026-09-17', 'RCH-B03 · 48 suits', 'Rs. 88,800', 'Rs. 88,800'],
  ['PUR-204', 'Fashion Avenue', '2026-09-18', 'FA-B04 · 36 suits', 'Rs. 41,400', 'Rs. 41,400'],
]

const toAmount = (value) => Number(String(value).replace(/[^\d]/g, '')) || 0
const seededDeliveries = () => initialRows.map(([reference, supplier, arrivalDate, batch, total, paid]) => ({
  id: reference,
  reference,
  supplier,
  arrivalDate,
  batch,
  items: [],
  total: toAmount(total),
  paid: toAmount(paid),
}))

function loadDeliveries() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved)) return saved
  } catch {
    // Use the bundled demo deliveries if saved data is unavailable or malformed.
  }
  return seededDeliveries()
}

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString()}`

export default function ReceiveStock() {
  const [deliveries, setDeliveries] = useState(loadDeliveries)
  const [isAddingDelivery, setAddingDelivery] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const totalPurchased = deliveries.reduce((sum, delivery) => sum + Number(delivery.total || 0), 0)
  const totalPaid = deliveries.reduce((sum, delivery) => sum + Number(delivery.paid || 0), 0)
  const stats = [
    ['Deliveries', deliveries.length.toString()],
    ['Purchased', money(totalPurchased)],
    ['Payments at receiving', money(totalPaid)],
    ['Supplier dues', money(Math.max(0, totalPurchased - totalPaid))],
  ]

  const saveDelivery = (delivery) => {
    const referenceNumber = deliveries.reduce((highest, entry) => Math.max(highest, Number(String(entry.reference).replace(/\D/g, '')) || 0), 200) + 1
    const payments = delivery.payments
    const paid = payments.cash + payments.bankTransfer + payments.cheque
    const savedDelivery = {
      ...delivery,
      id: `PUR-${referenceNumber}`,
      reference: `PUR-${referenceNumber}`,
      batch: delivery.items.map((item) => item.batchNumber).filter((value, index, all) => all.indexOf(value) === index).join(', '),
      quantity: delivery.items.reduce((sum, item) => sum + item.quantity, 0),
      total: paid,
      paid,
    }
    const nextDeliveries = [savedDelivery, ...deliveries]
    setDeliveries(nextDeliveries)
    let message = 'Delivery saved successfully'
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDeliveries))
    } catch {
      message = 'Delivery saved for this session, but browser storage is unavailable.'
    }
    setAddingDelivery(false)
    setToast(message)
  }

  const tableRows = deliveries.map((delivery) => {
    const itemSummary = delivery.items?.length
      ? `${delivery.batch} · ${delivery.quantity} suits`
      : delivery.batch
    return [delivery.reference, delivery.supplier, delivery.arrivalDate, itemSummary, money(delivery.total), money(delivery.paid)]
  })

  return (
    <main className="receive-page">
      <div className="receive-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Receive stock</h1>
          <p className="receive-intro">Add a supplier’s delivery and create traceable product labels.</p>
        </div>
        <button className="receive-primary-button" type="button" onClick={() => setAddingDelivery(true)}>+ New delivery</button>
      </div>
      <ReceiveStats stats={stats} />
      <ReceiveTable deliveries={tableRows} />
      {isAddingDelivery && <NewDeliveryModal onClose={() => setAddingDelivery(false)} onSave={saveDelivery} />}
      {toast && <div className="receive-toast" role="status">{toast}</div>}
    </main>
  )
}
