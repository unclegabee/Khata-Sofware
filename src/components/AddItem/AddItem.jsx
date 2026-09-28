import './AddItem.css'
import { useState } from 'react'

export default function AddItem({ onAddItem }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')

  const handleSelectPopular = (item) => {
    setName(item.name)
    setPrice(item.price)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim()) return

    onAddItem({
      name: name.trim(),
      quantity: Number(quantity) || 1,
      price: Number(price) || 0,
    })

    setName('')
    setQuantity(1)
    setPrice('')
  }

  return (
    <section className="add-item-panel">
      <div className="add-item-header">
        <h2>Add an item</h2>
        
      </div>

      <form onSubmit={handleSubmit}>
        <div className="item-name-grid">
          <label>Item name or article
            <input
              className="item-search"
              name="name"
              placeholder="e.g. Printed Lawn Suit..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="item-entry-row">
          <label>Quantity
            <input
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />
          </label>
          <label>Price per suit
            <input
              name="price"
              type="number"
              placeholder="Rs. 0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
          </label>
          <button className="primary-button" type="submit">Add to cart →</button>
        </div>
      </form>
      <p className="item-hint">Click a popular item above or type a custom item name.</p>
    </section>
  )
}
