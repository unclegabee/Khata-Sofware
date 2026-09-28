import './CustomerInvoice.css'

export default function CustomerInvoice({ customers = [], selectedCustomerId = 'walk-in', onCustomerChange, onNewCustomer, paidInvoiceNumber, onPaidInvoiceNumberChange, phone, onPhoneChange, address, onAddressChange }) {
  return (
    <section className="panel customer-panel">
      <div className="panel-heading">
        <h2>Customer &amp; invoice</h2>
        <button className="outline-button" type="button" onClick={onNewCustomer}>+ New customer</button>
      </div>
      <div className="form-grid">
        <label>Customer / retailer
          <select value={selectedCustomerId} onChange={(event) => onCustomerChange(event.target.value)}>
            <option value="walk-in">Walk-in customer</option>
            {customers.map((customer) => <option value={customer.id} key={customer.id}>{customer.name}</option>)}
          </select>
        </label>
        <label>Pad invoice number (optional)<input type="text" value={paidInvoiceNumber} onChange={(event) => onPaidInvoiceNumberChange(event.target.value)} placeholder="e.g. — or PAD-102" /></label>
        <label>Phone number<input type="tel" value={phone} onChange={(event) => onPhoneChange(event.target.value)} /></label>
        <label>Address<input type="text" value={address} onChange={(event) => onAddressChange(event.target.value)} /></label>
      </div>
    </section>
  )
}
