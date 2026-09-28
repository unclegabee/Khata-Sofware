import './ChequeRegister.css'
import { useState } from 'react'
import FormDialog from '../../components/FormDialog/FormDialog.jsx'

export default function ChequeRegister() {
  const [cheques, setCheques] = useState([])
  const [isAddingCheque, setAddingCheque] = useState(false)
  const addCheque = (cheque) => {
    setCheques((currentCheques) => [...currentCheques, { ...cheque, id: `${Date.now()}` }])
    setAddingCheque(false)
  }
  const supplierCheques = cheques.filter((cheque) => cheque.direction === 'Given')
  const customerCheques = cheques.filter((cheque) => cheque.direction === 'Received')
  const formatTotal = (rows) => `Rs. ${rows.reduce((sum, row) => sum + row.amount, 0).toLocaleString()}`
  const renderRows = (rows) => rows.length ? rows.map((cheque) => <tr key={cheque.id}><td>{cheque.number}<small>{cheque.bank}</small></td><td>{cheque.party}</td><td>Rs. {cheque.amount.toLocaleString()}</td><td>{cheque.issued}</td><td>{cheque.clearance}</td><td>{cheque.purpose}</td><td>{cheque.status}</td></tr>) : <tr><td colSpan="7">Nothing here yet.</td></tr>

  return (
    <main className="cheque-page">
      <div className="cheque-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Cheque register</h1>
          <p className="cheque-intro">Supplier cheques and customer cheques are kept separate on the same page.</p>
        </div>
        <button className="cheque-primary-button" type="button" onClick={() => setAddingCheque(true)}>+ Add new cheque</button>
      </div>
      <h2 className="supplier-cheques-heading">Supplier cheques – given <span>· {formatTotal(supplierCheques)}</span></h2>
      <div className="cheque-table-wrap">
        <table className="cheque-table">
          <thead><tr><th>Cheque / bank</th><th>Party</th><th>Amount</th><th>Issued</th><th>Expected clearance</th><th>Purpose</th><th>Status</th></tr></thead>
          <tbody>{renderRows(supplierCheques)}</tbody>
        </table>
      </div>
      <h2 className="customer-cheques-heading">Customer cheques – received <span>· {formatTotal(customerCheques)}</span></h2>
      <div className="cheque-table-wrap">
        <table className="cheque-table">
          <thead><tr><th>Cheque / bank</th><th>Party</th><th>Amount</th><th>Issued</th><th>Expected clearance</th><th>Purpose</th><th>Status</th></tr></thead>
          <tbody>{renderRows(customerCheques)}</tbody>
        </table>
      </div>
      {isAddingCheque && <FormDialog title="Add new cheque" fields={[
        { name: 'direction', label: 'Direction', options: [{ value: 'Given', label: 'Supplier cheque given' }, { value: 'Received', label: 'Customer cheque received' }] },
        { name: 'number', label: 'Cheque number' },
        { name: 'bank', label: 'Bank' },
        { name: 'party', label: 'Supplier / customer' },
        { name: 'amount', label: 'Amount', type: 'number', min: '1' },
        { name: 'issued', label: 'Issue date', type: 'date', defaultValue: new Date().toISOString().slice(0, 10) },
        { name: 'clearance', label: 'Expected clearance', type: 'date', defaultValue: new Date().toISOString().slice(0, 10) },
        { name: 'purpose', label: 'Purpose', required: false },
        { name: 'status', label: 'Status', options: [{ value: 'Pending', label: 'Pending' }, { value: 'Cleared', label: 'Cleared' }, { value: 'Returned', label: 'Returned' }] },
      ]} onClose={() => setAddingCheque(false)} onSave={addCheque} />}
    </main>
  )
}
