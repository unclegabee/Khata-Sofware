import './NewCustomer.css'

export default function NewCustomer({ onCancel, onSave }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSave({
      name: formData.get('name').trim(),
      phone: formData.get('phone').trim(),
      address: formData.get('address').trim(),
      city: formData.get('city').trim(),
      openingBalance: Number(formData.get('openingBalance')),
    })
  }

  return (
    <main className="new-customer-page">
      <div className="new-customer-heading">
        <h1>New customer</h1>
        <button className="new-customer-close" type="button" aria-label="Close" onClick={onCancel}>×</button>
      </div>

      <form className="new-customer-form" onSubmit={handleSubmit}>
        <div className="new-customer-fields">
          <label>Address
            <input name="address" type="text" />
          </label>
          <label>Full name / business
            <input autoFocus name="name" type="text" required />
          </label>
          <label>Phone
            <input name="phone" type="tel" />
          </label>
          <label>City
            <input name="city" type="text" />
          </label>
          <label className="new-customer-balance">Opening balance (negative for advance)
            <input name="openingBalance" type="number" step="1" defaultValue="0" />
          </label>
        </div>
        <p className="new-customer-balance-note">Positive balance means customer owes the shop.</p>
        <div className="new-customer-actions">
          <button className="new-customer-submit" type="submit">Save customer</button>
        </div>
      </form>
    </main>
  )
}