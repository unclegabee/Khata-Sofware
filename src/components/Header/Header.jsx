import './Header.css'

export default function Header({ onMenuClick }) {
  return (
    <header className="topbar">
      <button className="menu-button" type="button" aria-label="Open navigation" onClick={onMenuClick}>☰</button>
      <div className="brand-mark" aria-hidden="true">K</div>
      <div className="brand-copy">
        <strong>Kapra Khata</strong>
        <span>WHOLESALE. SIMPLIFIED</span>
      </div>
      <div className="topbar-spacer" />
      <time dateTime="2026-09-27">27 September 2026</time>
      <div className="owner-avatar">AK</div>
      <div className="owner-copy">
        <strong>Shop owner</strong>
        <span>Main branch</span>
      </div>
    </header>
  )
}
