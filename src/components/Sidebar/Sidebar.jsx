import './Sidebar.css'
import SidebarBrand from './SidebarBrand.jsx'
import PrimaryNavigation from './PrimaryNavigation.jsx'
import BusinessNavigation from './BusinessNavigation.jsx'
import ShopNavigation from './ShopNavigation.jsx'
import SidebarNote from './SidebarNote.jsx'

const pageForLabel = {
  'Bills & receipts': 'bills',
  'Customer returns': 'returns',
  'Orders & held bills': 'orders',
  'Stock & products': 'stock',
  'Receive stock': 'receive',
  Suppliers: 'suppliers',
  'Customer khata': 'khata',
  'Cheque register': 'cheques',
  'Shop expenses': 'expenses',
  'Daily closing': 'closing',
  Reports: 'reports',
  Settings: 'settings',
}

function NavigationLink({ icon, label, active, onClick }) {
  return (
    <button className={`sidebar-link${active ? ' active' : ''}`} type="button" onClick={onClick} aria-current={active ? 'page' : undefined}>
      <span className="sidebar-icon" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default function Sidebar({ activePage, onClose, onNavigate }) {
  const selectedPage = activePage === 'bill-receipt' || activePage === 'new-customer' ? 'new-sale' : activePage
  const renderLink = (icon, label) => (
    <NavigationLink key={label} icon={icon} label={label} active={selectedPage === pageForLabel[label]} onClick={() => onNavigate(label)} />
  )

  return (
    <>
      <button className="sidebar-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />
      <aside className="sidebar" aria-label="Main navigation">
        <SidebarBrand onClose={onClose} />
        <nav className="sidebar-nav">
          <button className={`sidebar-link${selectedPage === 'new-sale' ? ' active' : ''}`} type="button" onClick={() => onNavigate('New sale')} aria-current={selectedPage === 'new-sale' ? 'page' : undefined}>
            <span className="sidebar-icon" aria-hidden="true">+</span>
            <span>New sale</span>
          </button>
          <PrimaryNavigation renderLink={renderLink} />
          <BusinessNavigation renderLink={renderLink} />
          <ShopNavigation renderLink={renderLink} />
        </nav>
        <SidebarNote />
      </aside>
    </>
  )
}