import './StockTools.css'

export default function StockTools({ query, onQueryChange, onPrint }) {
  return <div className="stock-tools"><input type="search" placeholder="Search product, batch or supplier" value={query} onChange={(event) => onQueryChange(event.target.value)} /><button type="button" onClick={onPrint}>Print product labels</button></div>
}
