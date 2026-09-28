import './DailyClosing.css'
import { useState } from 'react'
import DailyClosingForm from '../../components/DailyClosingForm/DailyClosingForm.jsx'
import NonCashSummary from '../../components/NonCashSummary/NonCashSummary.jsx'
import SavedDailyRecords from '../../components/SavedDailyRecords/SavedDailyRecords.jsx'

const movement = ['Cash sales', 'Customer cash received', 'Supplier cash paid', 'Cash refunds', 'Cash expenses / withdrawals']

export default function DailyClosing() {
  const [businessDate, setBusinessDate] = useState(new Date().toISOString().slice(0, 10))
  const [openingCash, setOpeningCash] = useState('')
  const [openingNote, setOpeningNote] = useState('')
  const [openingSaved, setOpeningSaved] = useState(false)
  const [records, setRecords] = useState([])
  const expectedCash = Number(openingCash || 0)

  const saveRecord = (record) => setRecords((currentRecords) => [...currentRecords, { ...record, date: businessDate, id: `${Date.now()}` }])
  const saveOpening = () => {
    saveRecord({ type: 'Opening', expected: expectedCash, actual: expectedCash, difference: 0, note: openingNote })
    setOpeningSaved(true)
  }

  return (
    <main className="closing-page">
      <div className="closing-heading">
        <div>
          <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
          <h1>Daily open &amp; closing</h1>
          <p className="closing-intro">Open the drawer at the start, then close it with an actual cash count.</p>
        </div>
        <label className="business-date">Business date<input type="date" value={businessDate} onChange={(event) => setBusinessDate(event.target.value)} /></label>
      </div>
      <div className="closing-grid">
        <section className="opening-card">
          <div className="closing-card-heading"><h2>1. Daily opening</h2><span>{openingSaved ? 'Saved' : 'Not saved'}</span></div>
          <p>Enter the cash physically available before sales start. This is optional for a new day.</p>
          <label>Opening cash in drawer<input type="number" min="0" value={openingCash} onChange={(event) => { setOpeningCash(event.target.value); setOpeningSaved(false) }} /></label>
          <label>Opening note (optional)<textarea value={openingNote} onChange={(event) => setOpeningNote(event.target.value)} /></label>
          <button type="button" onClick={saveOpening}>Save daily opening</button>
        </section>
        <section className="movement-card">
          <h2>2. Today’s movement</h2>
          <div className="movement-list">{movement.map((item) => <div key={item}><span>{item}</span><strong>Rs. 0</strong></div>)}</div>
          <div className="net-movement"><strong>Net cash movement</strong><strong>Rs. 0</strong></div>
        </section>
      </div>
      <div className="closing-grid closing-lower-grid">
        <DailyClosingForm expectedCash={expectedCash} onSave={(record) => saveRecord({ ...record, type: 'Closing' })} />
        <NonCashSummary />
      </div>
      <SavedDailyRecords records={records} />
    </main>
  )
}
