import './SalesBySupplier.css'

const sales = [['Royal Cloth House', 'Rs. 23,333.33', 68], ['Fashion Avenue', 'Rs. 11,666.67', 34]]

export default function SalesBySupplier() { return <section className="sales-supplier-panel"><h2>Sales by supplier</h2><div className="supplier-bars">{sales.map(([name, value, width]) => <div className="supplier-bar-row" key={name}><span>{name}</span><div className="supplier-bar"><i style={{ width: `${width}%` }} /></div><strong>{value}</strong></div>)}</div><p>Sales before returns, after bill discounts.</p></section> }
