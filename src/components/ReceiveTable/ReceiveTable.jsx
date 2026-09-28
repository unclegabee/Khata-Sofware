import './ReceiveTable.css'

export default function ReceiveTable({ deliveries }) {
  return <div className="receive-table-wrap"><table className="receive-table"><thead><tr><th>Reference</th><th>Supplier</th><th>Date</th><th>Delivery</th><th>Total</th><th>Paid</th></tr></thead><tbody>{deliveries.map((delivery) => <tr key={delivery[0]}>{delivery.map((value, index) => <td key={`${delivery[0]}-${index}`}>{value}</td>)}</tr>)}</tbody></table></div>
}
