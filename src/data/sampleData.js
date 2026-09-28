export const sampleCustomers = [
  {
    id: 'AT',
    initials: 'AT',
    name: 'Ali Traders',
    phone: '0300 1234567',
    city: 'Lahore',
    address: '',
    details: 'Lahore · 0300 1234567',
    balance: 25000,
    openingBalance: 25000,
  },
  {
    id: 'HF',
    initials: 'HF',
    name: 'Hassan Fabrics',
    phone: '0321 4567890',
    city: 'Faisalabad',
    address: 'Clock Tower Market',
    details: 'Faisalabad · 0321 4567890',
    balance: 0,
    openingBalance: 0,
  },
  {
    id: 'AB',
    initials: 'AB',
    name: 'Al-Noor Boutique',
    phone: '0333 1122334',
    city: 'Multan',
    address: 'Cantt Market',
    details: 'Multan · 0333 1122334',
    balance: 8500,
    openingBalance: 8500,
  },
]

export const sampleProducts = [
  { name: 'Printed Lawn Suit', shade: 'Sky blue', price: 2000, supplier: 'Royal Cloth House' },
  { name: 'Cotton Embroidered Suit', shade: 'Dusty rose', price: 1500, supplier: 'Fashion Avenue' },
  { name: 'Premium Linen Suit', shade: 'Olive green', price: 2600, supplier: 'Royal Cloth House' },
  { name: 'Classic Cotton Suit', shade: 'Sand beige', price: 1750, supplier: 'Fashion Avenue' },
]

export const initialBills = [
  {
    id: 'bill-1052',
    number: 'INV-1052',
    date: '2026-09-18',
    paymentDue: '2026-09-25',
    customerId: 'AT',
    customer: 'Ali Traders',
    customerPhone: '0300 1234567',
    customerAddress: '',
    padInvoiceNumber: '',
    customerDetails: {
      id: 'AT',
      name: 'Ali Traders',
      phone: '0300 1234567',
      address: '',
      city: '',
    },
    items: [
      {
        id: 'item-1052-1',
        name: 'Printed Lawn Suit',
        shade: 'Sky blue',
        quantity: 12,
        price: 2000,
      },
      {
        id: 'item-1052-2',
        name: 'Cotton Embroidered Suit',
        shade: 'Dusty rose',
        quantity: 8,
        price: 1500,
      },
    ],
    subtotal: 36000,
    discount: 1000,
    total: 35000,
    payments: {
      cash: 20000,
      bank: 0,
      cheque: 0,
    },
    paid: 20000,
    due: 15000,
  },
]

export const initialReturns = [
  {
    id: 'RET-101',
    originalBill: 'INV-1048',
    date: '2026-09-15',
    customer: 'Hassan Fabrics',
    item: 'Printed Lawn Suit · Sky blue (2 suits)',
    credit: 'Rs. 4,000',
    refund: 'Rs. 0',
  },
]
