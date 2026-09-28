import './SavedDailyRecords.css'

export default function SavedDailyRecords({ records }) {
  return (
    <section className="saved-records">
      <h2>Saved daily records</h2>
      <div className="saved-records-table-wrap">
        <table className="saved-records-table">
          <thead><tr><th>Date</th><th>Record</th><th>Expected</th><th>Actual</th><th>Difference</th><th>Note</th></tr></thead>
          <tbody>{records.length ? records.map((record) => <tr key={record.id}><td>{record.date}</td><td>{record.type}</td><td>Rs. {record.expected.toLocaleString()}</td><td>Rs. {record.actual.toLocaleString()}</td><td>Rs. {record.difference.toLocaleString()}</td><td>{record.note || '—'}</td></tr>) : <tr><td colSpan="6">Nothing here yet.</td></tr>}</tbody>
        </table>
      </div>
    </section>
  )
}
