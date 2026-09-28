import { useState } from 'react'
import Header from './src/components/Header/Header.jsx'
import Footer from './src/components/Footer/Footer.jsx'
import Sidebar from './src/components/Sidebar/Sidebar.jsx'
import NewSale from './src/pages/new-sale/NewSale.jsx'
import NewCustomer from './src/pages/new-customer/NewCustomer.jsx'
import BillsReceipts from './src/pages/bills-receipts/BillsReceipts.jsx'
import BillReceipt from './src/pages/bill-receipt/BillReceipt.jsx'
import CustomerReturns from './src/pages/customer-returns/CustomerReturns.jsx'
import OrdersHeld from './src/pages/orders-held/OrdersHeld.jsx'
import StockProducts from './src/pages/stock-products/StockProducts.jsx'
import ReceiveStock from './src/pages/receive-stock/ReceiveStock.jsx'
import Suppliers from './src/pages/suppliers/Suppliers.jsx'
import CustomerKhata from './src/pages/customer-khata/CustomerKhata.jsx'
import ChequeRegister from './src/pages/cheque-register/ChequeRegister.jsx'
import ShopExpenses from './src/pages/shop-expenses/ShopExpenses.jsx'
import DailyClosing from './src/pages/daily-closing/DailyClosing.jsx'
import Reports from './src/pages/reports/Reports.jsx'
import Settings from './src/pages/settings/Settings.jsx'
import { sampleCustomers, initialBills } from './src/data/sampleData.js'

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('new-sale')
  const [customers, setCustomers] = useState(sampleCustomers)
  const [selectedCustomerId, setSelectedCustomerId] = useState(sampleCustomers[0]?.id || 'walk-in')
  const [customerReturnPage, setCustomerReturnPage] = useState('new-sale')
  const [savedBills, setSavedBills] = useState(initialBills)
  const [currentReceipt, setCurrentReceipt] = useState(null)
  const [receiptOriginPage, setReceiptOriginPage] = useState('new-sale')
  const [heldBills, setHeldBills] = useState([])
  const [resumeDraft, setResumeDraft] = useState(null)

  const navigateTo = (page) => {
    setCurrentPage(
      page === 'New customer' ? 'new-customer' :
        page === 'Bills & receipts' ? 'bills' :
        page === 'Customer returns' ? 'returns' :
          page === 'Orders & held bills' ? 'orders' :
            page === 'Stock & products' ? 'stock' :
              page === 'Receive stock' ? 'receive' :
                page === 'Suppliers' ? 'suppliers' :
                  page === 'Customer khata' ? 'khata' :
                    page === 'Cheque register' ? 'cheques' :
                      page === 'Shop expenses' ? 'expenses' :
                        page === 'Daily closing' ? 'closing' :
                          page === 'Reports' ? 'reports' :
                            page === 'Settings' ? 'settings' : 'new-sale',
    )
    setSidebarOpen(false)
  }

  const addCustomer = (customer) => {
    const savedCustomer = { ...customer, id: Date.now().toString() }
    setCustomers((currentCustomers) => [...currentCustomers, savedCustomer])
    if (customerReturnPage === 'new-sale') setSelectedCustomerId(savedCustomer.id)
    setCurrentPage(customerReturnPage)
    setCustomerReturnPage('new-sale')
  }

  const saveBill = (bill, origin = 'new-sale') => {
    const customer = customers.find((entry) => entry.id === bill.customerId)
    const nextInvoiceNum = `INV-${Math.max(1052, ...savedBills.map((b) => Number(String(b.number).replace(/\D/g, '') || 0))) + 1}`
    const savedBill = {
      ...bill,
      number: bill.number || nextInvoiceNum,
      date: bill.date || new Date().toISOString().slice(0, 10),
      customer: bill.customer || customer?.name || 'Walk-in customer',
      customerDetails: bill.customerDetails || {
        ...(customer ?? { name: 'Walk-in customer' }),
        phone: bill.customerPhone || customer?.phone || '',
        address: bill.customerAddress || customer?.address || '',
      },
      padInvoiceNumber: bill.padInvoiceNumber || bill.paidInvoiceNumber || '',
      paymentDue: bill.paymentDue || bill.paymentDueDate || '',
      paid: Number(bill.paid ?? ((bill.payments?.cash || 0) + (bill.payments?.bank || 0))),
      due: Number(bill.due ?? Math.max(0, bill.total - ((bill.payments?.cash || 0) + (bill.payments?.bank || 0)))),
    }
    setSavedBills((currentBills) => [savedBill, ...currentBills.filter((b) => b.number !== savedBill.number)])
    setCurrentReceipt(savedBill)
    setReceiptOriginPage(origin)
    if (origin !== 'bills') {
      setCurrentPage('bill-receipt')
    }
    return savedBill
  }

  const holdBill = (bill) => {
    setHeldBills((currentBills) => [...currentBills, { ...bill, id: `${Date.now()}`, date: new Date().toISOString().slice(0, 10) }])
  }

  const resumeHeldBill = (bill) => {
    setHeldBills((currentBills) => currentBills.filter((entry) => entry.id !== bill.id))
    setResumeDraft(bill)
    setCurrentPage('new-sale')
  }

  const importBackup = (backup) => {
    setCustomers(backup.customers)
    setSavedBills(backup.savedBills)
    setHeldBills(backup.heldBills)
  }

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      {currentPage === 'bill-receipt' && currentReceipt ? (
        <BillReceipt
          bill={currentReceipt}
          onClose={() => navigateTo(receiptOriginPage === 'bills' ? 'Bills & receipts' : 'New sale')}
        />
      ) : currentPage === 'new-customer' ? (
        <NewCustomer onCancel={() => setCurrentPage(customerReturnPage)} onSave={addCustomer} />
      ) : currentPage === 'bills' ? (
        <BillsReceipts
          bills={savedBills}
          customers={customers}
          onSaveBill={(bill) => saveBill(bill, 'bills')}
          onNewSale={() => navigateTo('New sale')}
          onReturn={() => navigateTo('Customer returns')}
        />
      ) : currentPage === 'returns' ? (
        <CustomerReturns bills={savedBills} customers={customers} />
      ) : currentPage === 'orders' ? (
        <OrdersHeld
          bills={heldBills}
          onResume={resumeHeldBill}
          onDiscard={(id) => setHeldBills((currentBills) => currentBills.filter((bill) => bill.id !== id))}
        />
      ) : currentPage === 'stock' ? (
        <StockProducts onReceiveStock={() => navigateTo('Receive stock')} />
      ) : currentPage === 'receive' ? (
        <ReceiveStock />
      ) : currentPage === 'suppliers' ? (
        <Suppliers />
      ) : currentPage === 'khata' ? (
        <CustomerKhata
          customers={customers}
          onNewCustomer={() => { setCustomerReturnPage('khata'); setCurrentPage('new-customer') }}
        />
      ) : currentPage === 'cheques' ? (
        <ChequeRegister />
      ) : currentPage === 'expenses' ? (
        <ShopExpenses />
      ) : currentPage === 'closing' ? (
        <DailyClosing />
      ) : currentPage === 'reports' ? (
        <Reports bills={savedBills} />
      ) : currentPage === 'settings' ? (
        <Settings backupData={{ customers, savedBills, heldBills }} onImport={importBackup} />
      ) : (
        <NewSale
          customers={customers}
          bills={savedBills}
          selectedCustomerId={selectedCustomerId}
          onCustomerChange={setSelectedCustomerId}
          onNewCustomer={() => { setCustomerReturnPage('new-sale'); setCurrentPage('new-customer') }}
          onSaveBill={saveBill}
          onHoldBill={holdBill}
          initialDraft={resumeDraft}
          onDraftLoaded={() => setResumeDraft(null)}
        />
      )}
      <Footer />
      {isSidebarOpen && <Sidebar activePage={currentPage} onClose={() => setSidebarOpen(false)} onNavigate={navigateTo} />}
    </>
  )
}
