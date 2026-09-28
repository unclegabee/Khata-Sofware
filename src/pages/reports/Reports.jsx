import './Reports.css'
import ReportStats from '../../components/ReportStats/ReportStats.jsx'
import SalesBySupplier from '../../components/SalesBySupplier/SalesBySupplier.jsx'
import IncomeSpending from '../../components/IncomeSpending/IncomeSpending.jsx'
import StockMovements from '../../components/StockMovements/StockMovements.jsx'

export default function Reports({ bills = [] }) {
  const exportSales = () => {
    const rows = [['Invoice', 'Date', 'Customer', 'Total', 'Paid', 'Due'], ...bills.map((bill) => [bill.number, bill.date, bill.customer, bill.total, bill.paid, bill.due])]
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'kapra-khata-sales.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="reports-page">
      <div className="reports-heading"><div><h1>Business reports</h1><p>A clear picture of how the shop is doing.</p></div><button type="button" onClick={exportSales}>Export sales CSV</button></div>
      <ReportStats />
      <div className="report-panels"><SalesBySupplier /><IncomeSpending /></div>
      <StockMovements />
    </main>
  )
}
