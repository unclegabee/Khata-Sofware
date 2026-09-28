import './ShopExpenses.css'
import { useState } from 'react'
import FormDialog from '../../components/FormDialog/FormDialog.jsx'

export default function ShopExpenses() {
  const [entries, setEntries] = useState([])
  const [isAddingExpense, setAddingExpense] = useState(false)
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0)
  const withdrawals = entries.filter((entry) => entry.category === 'Personal withdrawal').reduce((sum, entry) => sum + entry.amount, 0)
  const cashExpenses = entries.filter((entry) => entry.method === 'Cash').reduce((sum, entry) => sum + entry.amount, 0)
  const stats = [
    ['Total expenses', `Rs. ${total.toLocaleString()}`],
    ['Personal withdrawals', `Rs. ${withdrawals.toLocaleString()}`],
    ['Cash expenses', `Rs. ${cashExpenses.toLocaleString()}`],
    ['Entries', entries.length.toString()],
  ]

  const addExpense = (expense) => {
    setEntries((currentEntries) => [...currentEntries, { ...expense, id: `${Date.now()}` }])
    setAddingExpense(false)
  }

  return (
    <main className="expenses-page">
      <div className="expenses-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Shop expenses</h1>
          <p className="expenses-intro">Daily expenses and personal withdrawals in one simple list.</p>
        </div>
        <button className="expenses-primary-button" type="button" onClick={() => setAddingExpense(true)}>+ Add expense</button>
      </div>
      <div className="expenses-stats">{stats.map(([label, value]) => <div className="expenses-stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="expenses-table-wrap">
        <table className="expenses-table">
          <thead><tr><th>Date</th><th>Category</th><th>Paid to</th><th>Description</th><th>Method</th><th>Amount</th></tr></thead>
          <tbody>{entries.length ? entries.map((entry) => <tr key={entry.id}><td>{entry.date}</td><td>{entry.category}</td><td>{entry.paidTo}</td><td>{entry.description}</td><td>{entry.method}</td><td>Rs. {entry.amount.toLocaleString()}</td></tr>) : <tr><td colSpan="6">Nothing here yet.</td></tr>}</tbody>
        </table>
      </div>
      {isAddingExpense && <FormDialog title="Add expense" fields={[
        { name: 'date', label: 'Date', type: 'date', defaultValue: new Date().toISOString().slice(0, 10) },
        { name: 'category', label: 'Category', options: [{ value: 'Shop expense', label: 'Shop expense' }, { value: 'Personal withdrawal', label: 'Personal withdrawal' }, { value: 'Utilities', label: 'Utilities' }] },
        { name: 'paidTo', label: 'Paid to', required: false },
        { name: 'method', label: 'Payment method', options: [{ value: 'Cash', label: 'Cash' }, { value: 'Bank transfer', label: 'Bank transfer' }] },
        { name: 'amount', label: 'Amount', type: 'number', min: '1' },
        { name: 'description', label: 'Description', required: false },
      ]} onClose={() => setAddingExpense(false)} onSave={addExpense} />}
    </main>
  )
}
