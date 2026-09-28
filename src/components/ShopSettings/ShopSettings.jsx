import './ShopSettings.css'
import { useState } from 'react'

export default function ShopSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kapra-khata-settings')) ?? { shopName: 'Kapra Khata', stockThreshold: '10', receiptFooter: 'Shukriya! Apna bill sambhal kar rakhein.' }
    } catch {
      return { shopName: 'Kapra Khata', stockThreshold: '10', receiptFooter: 'Shukriya! Apna bill sambhal kar rakhein.' }
    }
  })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextSettings = {
      shopName: formData.get('shopName').trim(),
      stockThreshold: formData.get('stockThreshold'),
      receiptFooter: formData.get('receiptFooter').trim(),
    }
    localStorage.setItem('kapra-khata-settings', JSON.stringify(nextSettings))
    setSettings(nextSettings)
    setSaved(true)
  }

  return (
    <section className="shop-settings-panel">
      <h2>Shop &amp; receipts</h2>
      <form onSubmit={handleSubmit}>
        <label>Shop name<input name="shopName" defaultValue={settings.shopName} onChange={() => setSaved(false)} required /></label>
        <label>Low-stock alert threshold<input name="stockThreshold" type="number" min="0" defaultValue={settings.stockThreshold} onChange={() => setSaved(false)} required /></label>
        <label>Receipt footer<input name="receiptFooter" defaultValue={settings.receiptFooter} onChange={() => setSaved(false)} /></label>
        <button type="submit">{saved ? 'Settings saved' : 'Save settings'}</button>
      </form>
    </section>
  )
}
