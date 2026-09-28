import './SidebarBrand.css'

export default function SidebarBrand({ onClose }) {
  return (
    <div className="sidebar-header">
      <div className="sidebar-brand-mark">K</div>
      <strong>Kapra Khata</strong>
      <button className="sidebar-close" type="button" aria-label="Close navigation" onClick={onClose}>×</button>
    </div>
  )
}
