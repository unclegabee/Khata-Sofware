import './CustomerKhata.css'
import { useState } from 'react'

const sampleCustomers = [
  { id: 'AT', initials: 'AT', name: 'Ali Traders', details: 'Lahore · 0300 1234567', balance: 25000 },
  { id: 'HF', initials: 'HF', name: 'Hassan Fabrics', details: 'Faisalabad · 0321 4567890', balance: 0 },
  { id: 'AB', initials: 'AB', name: 'Al-Noor Boutique', details: 'Multan · 0333 1122334', balance: 8500 },
]

export default function CustomerKhata({ customers: addedCustomers = [], onNewCustomer }) {
  const [query, setQuery] = useState('')
  const [recovered, setRecovered] = useState(false)
  const customList = addedCustomers
    .filter((c) => !sampleCustomers.some((sc) => sc.id === c.id || sc.name.toLowerCase() === c.name?.toLowerCase()))
    .map((customer) => ({
      id: customer.id,
      initials: customer.initials || customer.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
      name: customer.name,
      details: [customer.city, customer.phone].filter(Boolean).join(' · '),
      balance: customer.openingBalance ?? 0,
    }))
  const customers = [...sampleCustomers, ...customList]
  const displayedCustomers = customers.filter((customer) => `${customer.name} ${customer.details}`.toLowerCase().includes(query.toLowerCase()))
  const amountToReceive = recovered ? 0 : customers.reduce((sum, customer) => sum + Math.max(0, customer.balance), 0)
  const advanceBalance = customers.reduce((sum, customer) => sum + Math.max(0, -customer.balance), 0)
  const stats = [['Total customers', customers.length], ['Amount to receive', `Rs. ${amountToReceive.toLocaleString()}`], ['Advance balances', `Rs. ${advanceBalance.toLocaleString()}`], ['Transactions', customers.length - sampleCustomers.length + 1]]

  const recoverAll = () => {
    if (amountToReceive && window.confirm(`Mark all outstanding balances totaling Rs. ${amountToReceive.toLocaleString()} as recovered?`)) setRecovered(true)
  }

  return (
    <main className="khata-page">
      <div className="khata-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Customer khata</h1>
          <p className="khata-intro">A clear account for every customer.</p>
        </div>
        <button className="khata-primary-button" type="button" onClick={onNewCustomer}>+ New customer</button>
      </div>
      <div className="khata-stats">{stats.map(([label, value]) => <div className="khata-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="khata-tools"><button className="recovery-button" type="button" disabled={!amountToReceive} onClick={recoverAll}>Recovery All</button><input type="search" placeholder="Search by name..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="customer-cards">{displayedCustomers.map((customer) => {
        const balance = recovered ? 0 : customer.balance
        return <article className="customer-card" key={customer.id}><div className="customer-card-heading"><div className="customer-identity"><span className="customer-avatar">{customer.initials}</span><span><strong>{customer.name}</strong><small>{customer.details || 'Contact details not provided'}</small></span></div><span className="customer-arrow">↗</span></div><strong className="customer-amount">Rs. {Math.abs(balance).toLocaleString()}</strong><span className="customer-due">{balance < 0 ? 'Advance · Jama hai' : balance > 0 ? 'To receive · Lena hai' : 'Settled'}</span></article>
      })}</div>
    </main>
  )
}
