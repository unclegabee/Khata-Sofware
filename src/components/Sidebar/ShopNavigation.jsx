import './ShopNavigation.css'

const links = [
  ['▤', 'Cheque register'],
  ['−', 'Shop expenses'],
  ['◷', 'Daily closing'],
  ['▥', 'Reports'],
  ['⚙', 'Settings'],
]

export default function ShopNavigation({ renderLink }) {
  return (
    <>
      <p className="sidebar-label">SHOP MANAGEMENT</p>
      {links.map(([icon, label]) => renderLink(icon, label))}
    </>
  )
}
