import { useNavigate } from 'react-router'
import { useState } from 'react'
import { addInvoice, EMPTY_INVOICE_STATE, EMPTY_ITEM_STATE } from './utils/variables.jsx'
import { calculateDueDate, handleFormChange, handleItemChange, calculateInvoiceTotal, generateInvoiceId, addNewItem, deleteItem } from './utils/functions.jsx'
import { Sidebar } from './sidebar.jsx'
import './previewPage.css'
import BackLogo from '../assets/Path 2.svg'
import DeleteLogo from '../assets/Combined Shape.png'

export function NewInvoicePage() {
  const navigate = useNavigate()
  
  const [newInvoice, setNewInvoice] = useState(EMPTY_INVOICE_STATE)

  const handleFormChange = (path, value) => {
    setNewInvoice(handleFormChange(newInvoice, path, value))
  }

  const handleItemChange = (index, field, value) => {
    setNewInvoice(prev => ({
      ...prev,
      items: handleItemChange(prev.items, index, field, value)
    }))
  }

  const handlePaymentTermsChange = (value) => {
    const updatedInvoice = handleFormChange(newInvoice, 'invoiceDetails.paymentTerms', value)
    updatedInvoice.invoiceDetails.dueDate = calculateDueDate(updatedInvoice.invoiceDetails.date, value)
    setNewInvoice(updatedInvoice)
  }

  const handleInvoiceDateChange = (value) => {
    const updatedInvoice = handleFormChange(newInvoice, 'invoiceDetails.date', value)
    updatedInvoice.invoiceDetails.dueDate = calculateDueDate(value, updatedInvoice.invoiceDetails.paymentTerms || 'Next 30 days/ 1 month')
    setNewInvoice(updatedInvoice)
  }

  const handleSaveAndSend = () => {
    const invoiceToSave = JSON.parse(JSON.stringify(newInvoice))
    invoiceToSave.id = generateInvoiceId()
    invoiceToSave.status = 'pending'
    invoiceToSave.invoiceDetails.dueDate = calculateDueDate(invoiceToSave.invoiceDetails.date, invoiceToSave.invoiceDetails.paymentTerms)
    addInvoice(invoiceToSave)
    // Trigger storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'invoice-app-data',
      newValue: localStorage.getItem('invoice-app-data')
    }))
    navigate('/')
  }

  const handleSaveAsDraft = () => {
    const invoiceToSave = JSON.parse(JSON.stringify(newInvoice))
    invoiceToSave.id = generateInvoiceId()
    invoiceToSave.status = 'draft'
    invoiceToSave.invoiceDetails.dueDate = calculateDueDate(invoiceToSave.invoiceDetails.date, invoiceToSave.invoiceDetails.paymentTerms)
    addInvoice(invoiceToSave)
    // Trigger storage event to notify other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'invoice-app-data',
      newValue: localStorage.getItem('invoice-app-data')
    }))
    navigate('/')
  }

  const handleDiscard = () => {
    navigate('/')
  }

  const handleAddNewItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: addNewItem(prev.items)
    }))
  }

  const handleDeleteItem = (index) => {
    setNewInvoice(prev => ({
      ...prev,
      items: deleteItem(prev.items, index)
    }))
  }

  const total = calculateInvoiceTotal(newInvoice.items)

  return (
    <div className="preview-invoice-page">
      <Sidebar />
      <div className="invoice-detail">
        <button onClick={() => navigate('/')} className="back-button">
          <img src={BackLogo} alt="" /> Go Back
        </button>
        
        <div className="edit-mode active">
          <div className='edit-form-container'>
            <Sidebar/>
            <div className='edit-form'>
              <h1>New Invoice</h1>
              <form action="" className='the-form'>
                <fieldset>
                  <legend>Bill From</legend>
                  <div>
                    <label htmlFor="">Street Address</label><br />
                    <input type="text" value={newInvoice.billFrom.streetAddress} onChange={(e) => handleFormChange('billFrom.streetAddress', e.target.value)} placeholder='Enter Street Address' />
                  </div>
                  <div className='bill-from-address'>
                    <div>
                      <label htmlFor="">City</label><br />
                      <input type="text" value={newInvoice.billFrom.city} onChange={(e) => handleFormChange('billFrom.city', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="">Post Code</label><br />
                      <input type="text" value={newInvoice.billFrom.postCode} onChange={(e) => handleFormChange('billFrom.postCode', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="">Country</label><br />
                      <input type="text" value={newInvoice.billFrom.country} onChange={(e) => handleFormChange('billFrom.country', e.target.value)} />
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Bill To</legend>
                  <div>
                    <label htmlFor="">Client's Name</label><br />
                    <input value={newInvoice.clientInfo.name}
                    onChange={(e) => handleFormChange('clientInfo.name', e.target.value)}
                    type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Client's Email</label><br />
                    <input value={newInvoice.clientInfo.email} onChange={(e) => handleFormChange('clientInfo.email', e.target.value)} type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Street Address</label><br />
                    <input value={newInvoice.clientInfo.address} onChange={(e) => handleFormChange('clientInfo.address', e.target.value)} type="text" />
                  </div>
                  <div className='bill-to-address'>
                    <div>
                      <label htmlFor="">City</label><br />
                      <input value={newInvoice.clientInfo.city} onChange={(e) => handleFormChange('clientInfo.city', e.target.value)} type="text" />
                    </div>
                    <div>
                      <label htmlFor="">Post Code</label><br />
                      <input type="text" value={newInvoice.clientInfo.postCode} onChange={(e) => handleFormChange('clientInfo.postCode', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="">Country</label><br />
                      <input value={newInvoice.clientInfo.country} onChange={(e) => handleFormChange('clientInfo.country', e.target.value)} type="text" />
                    </div>  
                  </div>
                  <div className='invoice-date-inputs'>
                    <div>
                      <label htmlFor="">Invoice Date</label><br />
                      <input value={newInvoice.invoiceDetails.date} onChange={(e) => handleInvoiceDateChange(e.target.value)} type="date" />
                    </div>
                    <div>
                      <label htmlFor="">Payment Terms</label><br />
                      <select value={newInvoice.invoiceDetails.paymentTerms} onChange={(e) => handlePaymentTermsChange(e.target.value)}>
                        <option value="Next 1 day">Next 1 day</option>
                        <option value="Next 2 days">Next 2 days</option>
                        <option value="Next 3 days">Next 3 days</option>
                        <option value="Next 7 days">Next 7 days</option>
                        <option value="Next 14 days">Next 14 days</option>
                        <option value="Next 30 days/ 1 month">Next 30 days/ 1 month</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Project Description</label><br/>
                    <input value={newInvoice.projectDescription} onChange={(e) => handleFormChange('projectDescription', e.target.value)} type="text" />
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Item List</legend>
                  <table className="edit-items-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>QTY.</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td><input value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} type="text" /></td>
                          <td><input value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)} type="number" /></td>
                          <td><input value={item.rate} onChange={(e) => handleItemChange(idx, 'rate', parseFloat(e.target.value) || 0)} type="number" /></td>
                          <td>${(item.quantity * item.rate).toFixed(2)}</td>
                          <td><img src={DeleteLogo} alt="Delete" onClick={() => handleDeleteItem(idx)} style={{cursor: 'pointer'}} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button type="button" className='add-new-item-button' onClick={handleAddNewItem}>+ Add New Item</button>
                </fieldset>
              </form>
              <div className='edit-action-buttons'>
                <button className='cancel-button' onClick={handleDiscard}>Discard</button>
                <button className='save-draft-button' onClick={handleSaveAsDraft}>Save as Draft</button>
                <button className='save-button' onClick={handleSaveAndSend}>Save & Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
