import './ProductInputDemo.css'

const products = [
  ['Printed Lawn Suit', 'RCH-B01-BLU'],
  ['Cotton Embroidered Suit', 'FA-B02-PNK'],
  ['Premium Linen Suit', 'RCH-B03-OLV'],
  ['Classic Cotton Suit', 'FA-B04-SND'],
]

export default function ProductInputDemo() {
  return (
    <section className="product-input-demo">
      <h2>Try product input</h2>
      <p>Use these product codes with a keyboard-emulating scanner. Enter a code followed by Enter while the New Sale screen is open.</p>
      <div className="product-code-list">{products.map(([name, code]) => <div key={code}><span>{name}</span><strong>{code}</strong></div>)}</div>
    </section>
  )
}
