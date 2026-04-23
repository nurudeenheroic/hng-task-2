import { Routes, Route } from 'react-router'
import HomePage from './homePage.jsx'
import { PreviewPage } from './previewPage.jsx'
import { NewInvoicePage } from './newInvoicePage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/invoices/:id" element={<PreviewPage />}></Route>
      <Route path="/new-invoice" element={<NewInvoicePage />}></Route>
    </Routes>
  )
}
export default App
