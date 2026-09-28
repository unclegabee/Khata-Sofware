import './Settings.css'
import ShopSettings from '../../components/ShopSettings/ShopSettings.jsx'
import DemoDataBackup from '../../components/DemoDataBackup/DemoDataBackup.jsx'
import ProductInputDemo from '../../components/ProductInputDemo/ProductInputDemo.jsx'
import ActivityHistory from '../../components/ActivityHistory/ActivityHistory.jsx'

export default function Settings({ backupData, onImport }) {
  return (
    <main className="settings-page">
      <p className="eyebrow">YOUR WHOLESALE WORKSPACE</p>
      <h1>Settings</h1>
      <p className="settings-intro">Make the workspace feel like your shop.</p>
      <div className="settings-grid"><ShopSettings /><DemoDataBackup backupData={backupData} onImport={onImport} /></div>
      <ProductInputDemo />
      <ActivityHistory />
    </main>
  )
}
