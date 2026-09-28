import './DemoDataBackup.css'
import { useRef, useState } from 'react'

export default function DemoDataBackup({ backupData, onImport }) {
  const fileInput = useRef(null)
  const [message, setMessage] = useState('')

  const exportBackup = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'kapra-khata-backup.json'
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Backup downloaded.')
  }

  const importBackup = async (event) => {
    const [file] = event.target.files ?? []
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      if (!Array.isArray(data.customers) || !Array.isArray(data.savedBills) || !Array.isArray(data.heldBills)) throw new Error('This file is not a Kapra Khata backup.')
      onImport(data)
      setMessage('Backup imported.')
    } catch (error) {
      setMessage(error.message || 'Could not read this backup file.')
    }
    event.target.value = ''
  }

  const resetDemo = () => {
    if (window.confirm('Reset this demo and remove locally saved shop settings?')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <section className="demo-backup-panel">
      <h2>Demo data &amp; backup</h2>
      <p>This working UI keeps data in this browser. Export a backup before clearing browser storage or moving to another device.</p>
      <div className="backup-actions"><button type="button" onClick={exportBackup}>Export backup</button><button type="button" onClick={() => fileInput.current?.click()}>Import backup</button><input ref={fileInput} type="file" accept="application/json,.json" onChange={importBackup} hidden /></div>
      {message && <p role="status">{message}</p>}
      <div className="fresh-demo"><h3>Try a fresh demo</h3><p>Resetting removes local changes from this browser.</p><button type="button" onClick={resetDemo}>Reset demo</button></div>
      <div className="prototype-note">Prototype scope: browser-based owner workspace. Staff authentication, shared database, automated backups and real printer configuration are production integrations.</div>
    </section>
  )
}
