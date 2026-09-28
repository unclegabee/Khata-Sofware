import './StockTable.css'
import { useEffect, useState } from 'react'
import FormDialog from '../FormDialog/FormDialog.jsx'

export default function StockTable({ products, onAdjust }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [adjustingProduct, setAdjustingProduct] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null)
        setAdjustingProduct(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const saveAdjustment = ({ direction, quantity }) => {
    onAdjust(adjustingProduct.name, direction, quantity)
    setAdjustingProduct(null)
  }

  return (
    <>
      <div className="stock-table-wrap">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Supplier / batch</th>
              <th>Location</th>
              <th>Available</th>
              <th>Reserved</th>
              <th>Cost / sale</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td className="product-cell">
                  <span className={`product-mark ${product.tone}`}>✧</span>
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.colour}</small>
                  </span>
                </td>
                <td>
                  {product.supplier}
                  <small>{product.batch || product.batchFull}</small>
                </td>
                <td>{product.location}</td>
                <td>{product.available}</td>
                <td>{product.reserved || '0'}</td>
                <td>
                  {product.cost}
                  <small>{product.sale}</small>
                </td>
                <td className="stock-actions">
                  <button type="button" onClick={() => setSelectedProduct(product)}>
                    Details
                  </button>
                  <button type="button" onClick={() => setAdjustingProduct(product)}>
                    Adjust
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Details Modal matching the user screenshot */}
      {selectedProduct && (
        <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)}>
          <div
            className="product-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} details`}
          >
            <div className="product-modal-header">
              <h2>{selectedProduct.name}</h2>
              <button
                type="button"
                className="product-modal-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="product-badge-row">
              <div className={`product-badge-icon ${selectedProduct.tone || 'blue'}`}>
                <span className="star-icon">✦</span>
              </div>
              <div className="product-badge-info">
                <strong>
                  {selectedProduct.code
                    ? `${selectedProduct.code} · ${selectedProduct.shade || selectedProduct.colour?.split('·')[0]?.trim()}`
                    : selectedProduct.colour}
                </strong>
                <span>{selectedProduct.type || 'Unstitched'}</span>
              </div>
            </div>

            <div className="product-spec-grid">
              <div className="product-spec-item">
                <span className="spec-label">Supplier</span>
                <strong className="spec-value">{selectedProduct.supplier}</strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Batch</span>
                <strong className="spec-value">
                  {selectedProduct.batch || selectedProduct.batchFull?.split('·')[0]?.trim() || 'RCH-B01'}
                </strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Arrival date</span>
                <strong className="spec-value">
                  {selectedProduct.arrivalDate || selectedProduct.batchFull?.split('·')[1]?.trim() || '2026-09-12'}
                </strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Originally received</span>
                <strong className="spec-value">
                  {selectedProduct.originallyReceived || `${Number(selectedProduct.available || 0) + 12} suits`}
                </strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Batch colours</span>
                <strong className="spec-value">
                  {selectedProduct.shade || selectedProduct.colour?.split('·')[0]?.trim() || 'Sky blue'}
                </strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Available</span>
                <strong className="spec-value">{selectedProduct.available}</strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Reserved</span>
                <strong className="spec-value">{selectedProduct.reserved || '0'}</strong>
              </div>

              <div className="product-spec-item">
                <span className="spec-label">Defective / quarantine</span>
                <strong className="spec-value">{selectedProduct.defective || '0'}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {adjustingProduct && (
        <FormDialog
          title={`Adjust ${adjustingProduct.name}`}
          fields={[
            {
              name: 'direction',
              label: 'Adjustment',
              options: [
                { value: 'add', label: 'Add stock' },
                { value: 'remove', label: 'Remove stock' },
              ],
            },
            { name: 'quantity', label: 'Quantity', type: 'number', min: '1' },
          ]}
          onClose={() => setAdjustingProduct(null)}
          onSave={saveAdjustment}
        />
      )}
    </>
  )
}
