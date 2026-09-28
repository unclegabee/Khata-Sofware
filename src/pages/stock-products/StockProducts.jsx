import './StockProducts.css'
import { useState } from 'react'
import StockStats from '../../components/StockStats/StockStats.jsx'
import StockTools from '../../components/StockTools/StockTools.jsx'
import StockTable from '../../components/StockTable/StockTable.jsx'

const stats = [
  ['Available suits', '264'],
  ['Reserved', '0'],
  ['Defective / quarantine', '0'],
  ['Stock value', 'Rs. 353,400'],
]

const products = [
  { name: 'Printed Lawn Suit', colour: 'Sky blue · RCH-210', supplier: 'Royal Cloth House', batch: 'RCH-B01 · 2026-09-12', location: 'Rack A1', available: '108', cost: 'Rs. 1,400', sale: 'Sale Rs. 2,000', tone: 'blue' },
  { name: 'Cotton Embroidered Suit', colour: 'Dusty rose · FA-108', supplier: 'Fashion Avenue', batch: 'FA-B02 · 2026-09-15', location: 'Rack B2', available: '72', cost: 'Rs. 1,000', sale: 'Sale Rs. 1,500', tone: 'rose' },
  { name: 'Premium Linen Suit', colour: 'Olive green · RCH-304', supplier: 'Royal Cloth House', batch: 'RCH-B03 · 2026-09-17', location: 'Rack A3', available: '48', cost: 'Rs. 1,850', sale: 'Sale Rs. 2,600', tone: 'olive' },
  { name: 'Classic Cotton Suit', colour: 'Sand beige · FA-112', supplier: 'Fashion Avenue', batch: 'FA-B04 · 2026-09-18', location: 'Rack B1', available: '36', cost: 'Rs. 1,150', sale: 'Sale Rs. 1,750', tone: 'olive' },
]

export default function StockProducts({ onReceiveStock }) {
  const [products, setProducts] = useState([
    {
      name: 'Printed Lawn Suit',
      colour: 'Sky blue · RCH-210',
      code: 'RCH-210',
      shade: 'Sky blue',
      type: 'Unstitched',
      supplier: 'Royal Cloth House',
      batch: 'RCH-B01',
      arrivalDate: '2026-09-12',
      originallyReceived: '120 suits',
      location: 'Rack A1',
      available: '108',
      reserved: '0',
      defective: '0',
      cost: 'Rs. 1,400',
      sale: 'Sale Rs. 2,000',
      tone: 'blue',
    },
    {
      name: 'Cotton Embroidered Suit',
      colour: 'Dusty rose · FA-108',
      code: 'FA-108',
      shade: 'Dusty rose',
      type: 'Unstitched',
      supplier: 'Fashion Avenue',
      batch: 'FA-B02',
      arrivalDate: '2026-09-15',
      originallyReceived: '80 suits',
      location: 'Rack B2',
      available: '72',
      reserved: '0',
      defective: '0',
      cost: 'Rs. 1,000',
      sale: 'Sale Rs. 1,500',
      tone: 'rose',
    },
    {
      name: 'Premium Linen Suit',
      colour: 'Olive green · RCH-304',
      code: 'RCH-304',
      shade: 'Olive green',
      type: 'Unstitched',
      supplier: 'Royal Cloth House',
      batch: 'RCH-B03',
      arrivalDate: '2026-09-17',
      originallyReceived: '50 suits',
      location: 'Rack A3',
      available: '48',
      reserved: '0',
      defective: '0',
      cost: 'Rs. 1,850',
      sale: 'Sale Rs. 2,600',
      tone: 'olive',
    },
    {
      name: 'Classic Cotton Suit',
      colour: 'Sand beige · FA-112',
      code: 'FA-112',
      shade: 'Sand beige',
      type: 'Unstitched',
      supplier: 'Fashion Avenue',
      batch: 'FA-B04',
      arrivalDate: '2026-09-18',
      originallyReceived: '40 suits',
      location: 'Rack B1',
      available: '36',
      reserved: '0',
      defective: '0',
      cost: 'Rs. 1,150',
      sale: 'Sale Rs. 1,750',
      tone: 'olive',
    },
  ])
  const [query, setQuery] = useState('')
  const availableTotal = products.reduce((sum, product) => sum + Number(product.available), 0)
  const stockValue = products.reduce((sum, product) => sum + Number(product.available) * Number(product.cost.replace(/[^\d]/g, '')), 0)
  const stats = [['Available suits', availableTotal.toLocaleString()], ['Reserved', '0'], ['Defective / quarantine', '0'], ['Stock value', `Rs. ${stockValue.toLocaleString()}`]]
  const filteredProducts = products.filter((product) => Object.values(product).join(' ').toLowerCase().includes(query.toLowerCase()))

  const adjustStock = (name, direction, quantity) => {
    setProducts((currentProducts) => currentProducts.map((product) => product.name === name ? {
      ...product,
      available: String(Math.max(0, Number(product.available) + (direction === 'add' ? quantity : -quantity))),
    } : product))
  }

  return (
    <main className="stock-page">
      <div className="stock-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Stock &amp; products</h1>
          <p className="stock-intro">Every suit, colour and batch in one place.</p>
        </div>
        <button className="stock-primary-button" type="button" onClick={onReceiveStock}>+ Receive stock</button>
      </div>
      <StockStats stats={stats} />
      <StockTools query={query} onQueryChange={setQuery} onPrint={() => window.print()} />
      <StockTable products={filteredProducts} onAdjust={adjustStock} />
    </main>
  )
}
