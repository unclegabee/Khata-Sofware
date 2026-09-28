import './ReturnSearch.css'

export default function ReturnSearch() {
  return <section className="returns-search-card"><div className="returns-form-grid"><label>Retailer / customer<select defaultValue=""><option value="" disabled>Choose retailer</option><option value="ali-traders">Ali Traders</option></select></label><label>Item name / article<input placeholder="Type the returned item name" /></label></div><p className="returns-hint">Choose the retailer to see only their purchases.</p></section>
}
