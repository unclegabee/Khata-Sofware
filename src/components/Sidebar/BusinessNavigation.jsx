import './BusinessNavigation.css'

const links = [
  ['▦', 'Stock & products'],
  ['↓', 'Receive stock'],
  ['▥', 'Suppliers'],
  ['♧', 'Customer khata'],
  ['◇', 'Defects & claims'],
]

export default function BusinessNavigation({ renderLink }) {
  return (
    <>
      <p className="sidebar-label">MANAGE YOUR BUSINESS</p>
      {links.map(([icon, label]) => renderLink(icon, label))}
    </>
  )
}
