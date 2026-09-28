import './Suppliers.css'
import { useState } from 'react'
import FormDialog from '../../components/FormDialog/FormDialog.jsx'

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    ['RC', 'Royal Cloth House', 'Lahore · 042 35781234', 'Rs. 68,000'],
    ['FA', 'Fashion Avenue', 'Karachi · 021 34561234', 'Rs. 38,000'],
  ])
  const [query, setQuery] = useState('')
  const [isAddingSupplier, setAddingSupplier] = useState(false)
  const totalDue = suppliers.reduce((sum, supplier) => sum + Number(supplier[3].replace(/[^\d]/g, '')), 0)
  const filteredSuppliers = suppliers.filter((supplier) => supplier.slice(1, 3).join(' ').toLowerCase().includes(query.toLowerCase()))

  const addSupplier = ({ name, phone, city, openingBalance }) => {
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    setSuppliers((currentSuppliers) => [...currentSuppliers, [initials, name, [city, phone].filter(Boolean).join(' · '), `Rs. ${openingBalance.toLocaleString()}`]])
    setAddingSupplier(false)
  }

  return (
    <main className="suppliers-page">
      <div className="suppliers-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Suppliers</h1>
          <p className="suppliers-intro">Purchases, payments and stock — supplier by supplier.</p>
        </div>
        <button className="supplier-primary-button" type="button" onClick={() => setAddingSupplier(true)}>+ New supplier</button>
      </div>
      <div className="supplier-stats">{[['Total suppliers', suppliers.length], ['Amount to pay', `Rs. ${totalDue.toLocaleString()}`], ['Advance balances', 'Rs. 0'], ['Transactions', suppliers.length + 2]].map(([label, value]) => <div className="supplier-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <input className="supplier-search" type="search" placeholder="Search by name..." value={query} onChange={(event) => setQuery(event.target.value)} />
      <div className="supplier-cards">{filteredSuppliers.map(([initials, name, details, amount]) => <article className="supplier-card" key={name}><div className="supplier-card-heading"><div className="supplier-identity"><span className="supplier-avatar">{initials}</span><span><strong>{name}</strong><small>{details}</small></span></div><span className="supplier-arrow">↗</span></div><strong className="supplier-amount">{amount}</strong><span className="supplier-due">To pay · Dena hai</span></article>)}</div>
      {isAddingSupplier && <FormDialog title="New supplier" fields={[
        { name: 'name', label: 'Supplier name' },
        { name: 'phone', label: 'Phone', required: false },
        { name: 'city', label: 'City', required: false },
        { name: 'openingBalance', label: 'Opening balance', type: 'number', min: '0', defaultValue: '0' },
      ]} onClose={() => setAddingSupplier(false)} onSave={addSupplier} />}
    </main>
  )
}
