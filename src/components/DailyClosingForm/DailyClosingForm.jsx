import './DailyClosingForm.css'
import { useState } from 'react'

export default function DailyClosingForm({ expectedCash, onSave }) {
  const [cashCounted, setCashCounted] = useState('')
  const [cashRemoved, setCashRemoved] = useState('0')
  const [note, setNote] = useState('')
  const expectedAfterDeposit = Math.max(0, expectedCash - Number(cashRemoved || 0))
  const difference = cashCounted === '' ? null : Number(cashCounted) - expectedAfterDeposit

  return (
    <section className="daily-closing-form">
      <div className="closing-card-heading"><h2>3. Daily closing</h2><span>{cashCounted === '' ? 'Open' : 'Ready to save'}</span></div>
      <p>Expected cash is calculated automatically. Count your drawer and save the difference.</p>
      <label>Cash counted in drawer<input type="number" min="0" value={cashCounted} onChange={(event) => setCashCounted(event.target.value)} /></label>
      <label>Cash removed / deposited (optional)<input type="number" value={cashRemoved} onChange={(event) => setCashRemoved(event.target.value)} min="0" /></label>
      <label>Closing note / difference reason (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} /></label>
      <div className="expected-cash"><div>Expected cash: <strong>Rs. {expectedAfterDeposit.toLocaleString()}</strong></div><div>Difference after count: <strong>{difference === null ? 'Enter actual cash to calculate' : `Rs. ${difference.toLocaleString()}`}</strong></div></div>
      <button type="button" disabled={cashCounted === ''} onClick={() => onSave({ actual: Number(cashCounted), expected: expectedAfterDeposit, difference, note })}>Save daily closing</button>
    </section>
  )
}
