import './PrimaryNavigation.css'

const links = [
  ['▤', 'Bills & receipts'],
  ['↩', 'Customer returns'],
  ['▧', 'Orders & held bills'],
]

export default function PrimaryNavigation({ renderLink }) {
  return <>{links.map(([icon, label]) => renderLink(icon, label))}</>
}
