import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { invoices, updateInvoice, deleteInvoice } from './utils/variables.jsx'
import { calculateDueDate, handleFormChange, handleItemChange, calculateInvoiceTotal } from './utils/functions.jsx'
import { Sidebar } from './sidebar.jsx'
import './previewPage.css'
import BackLogo from '../assets/Path 2.svg'
import DeleteLogo from '../assets/Combined Shape.png' 

export function PreviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(false)
  const [editInvoice, setEditInvoice] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  // Find the invoice by ID
  let invoice = invoices.find(inv => inv.id === id)
  
  // Use editInvoice if in edit mode, otherwise use original invoice
  if (editInvoice) {
    invoice = editInvoice
  }
  
  if (!invoice) {
    return (
      <div className="preview-invoice-page">
        <Sidebar />
        <div className="invoice-detail">
          <button onClick={() => navigate('/')} className="back-button">← Back</button>
          <p>Invoice not found</p>
        </div>
      </div>
    )
  }
  
  const calculateDueDate = (invoiceDate, paymentTerms) => {
    const daysMap = {
      'Next 1 day': 1,
      'Next 2 days': 2,
      'Next 3 days': 3,
      'Next 7 days': 7,
      'Next 14 days': 14,
      'Next 30 days/ 1 month': 30
    }
    
    const date = new Date(invoiceDate)
    const days = daysMap[paymentTerms] || 0
    date.setDate(date.getDate() + days)
    
    return date.toISOString().split('T')[0]
  }

  const handleEditFormChange = (path, value) => {
    setEditInvoice(handleFormChange(editInvoice || invoice, path, value))
  }

  const handleItemChange = (index, field, value) => {
    setEditInvoice(prev => ({
      ...prev,
      items: handleItemChange(prev?.items || invoice.items, index, field, value)
    }))
  }

  const handlePaymentTermsChange = (value) => {
    const updatedInvoice = handleFormChange(editInvoice || invoice, 'invoiceDetails.paymentTerms', value)
    updatedInvoice.invoiceDetails.dueDate = calculateDueDate(updatedInvoice.invoiceDetails.date, value)
    setEditInvoice(updatedInvoice)
  }

  const handleInvoiceDateChange = (value) => {
    const updatedInvoice = handleFormChange(editInvoice || invoice, 'invoiceDetails.date', value)
    updatedInvoice.invoiceDetails.dueDate = calculateDueDate(value, updatedInvoice.invoiceDetails.paymentTerms || 'Next 30 days/ 1 month')
    setEditInvoice(updatedInvoice)
  }

  const handleSaveChanges = () => {
    // Update the invoice using localStorage function
    if (editInvoice) {
      updateInvoice(id, editInvoice)
    }
    setIsEditMode(false)
  }

  const handleCancel = () => {
    setEditInvoice(null)
    setIsEditMode(false)
  }

  const handleMarkAsPaid = () => {
    // Update invoice status using localStorage function
    const updatedInvoice = { ...invoice, status: 'paid' }
    updateInvoice(id, updatedInvoice)
    navigate('/')
  }

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = () => {
    // Delete invoice using localStorage function
    deleteInvoice(id)
    setShowDeleteConfirm(false)
    navigate('/')
  }

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
  }
  
  if (!invoice) {
    return (
      <div className="preview-invoice-page">
        <Sidebar />
        <div className="invoice-detail">
          <button onClick={() => navigate('/')} className="back-button">← Back</button>
          <p>Invoice not found</p>
        </div>
      </div>
    )
  }
  
  // Calculate total
  const editTotal = calculateInvoiceTotal(invoice.items)

  return (
    <div className="preview-invoice-page">
      <Sidebar />
      <div className="invoice-detail">
      <button onClick={() => navigate('/')} className="back-button">
<img src={ BackLogo } alt="" /> Go Back</button>
      
      <div className="invoice-header">
        <div className='status-section'>
          <p>Status</p>
          <div className={`status-badge ${invoice.status.toLowerCase()}`}>
            <span className={`status-indicator2 ${invoice.status.toLowerCase()}`}></span>
          {invoice.status}
        </div>
          
        </div>
        <div className='action-buttons'>
            <button className='edit-button' onClick={() => setIsEditMode(true)}>
              Edit
            </button>
            <button className='delete-button' onClick={handleDeleteClick}>
              Delete
            </button>
            {invoice.status !== 'paid' && invoice.status !== 'draft' && (
              <button className='mark-as-paid-button' onClick={handleMarkAsPaid}>
                Mark as Paid
              </button>
            )}
        </div>
      </div>

      <div className="invoice-content">
        <div className='first-section'>
          <div>
            <h1> #{invoice.id}</h1>
          <p className="description">{invoice.projectDescription}</p>
          </div>
          <div className="bill-from">
          <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>
        </div>
        <div className='second-section'>
          <div className='dates'>
            <div className='invoice-date'>
              <p className="label">Invoice Date</p>
              <p className="value">{invoice.invoiceDetails.date}</p>
            </div>
            <div className='due-date'>
                <p className="label">Payment Due</p>
                <p className="value">{invoice.invoiceDetails.dueDate}</p>
            </div>
            </div>
          <div className="bill-to">
            <p className='label'>Bill To</p>
            <p className='value'>{invoice.clientInfo.name}</p>
            <p>{invoice.clientInfo.address}</p>
            <p>{invoice.clientInfo.city}</p>
            <p>{invoice.clientInfo.postCode}</p>
            <p>{invoice.clientInfo.country}</p>
          </div>
          <div className='sent-to'>
              <p className='label'>Sent To</p>
            <p className='value'>{invoice.clientInfo.email}</p>
          </div>
        </div>
          
        <div>
          <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>QTY.</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.description}</td>
                <td className='td-color'>{item.quantity}</td>
                <td className='td-color'>${item.rate.toFixed(2)}</td>
                <td>${(item.quantity * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="invoice-total">
          <p className="label">Amount Due</p>
          <p className="value">${editTotal.toFixed(2)}</p>
        </div>
        </div>
      </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h2>Confirm Deletion</h2>
            <p>Do you want to delete this invoice?</p>
            <div className="delete-confirm-buttons">
              <button className="delete-confirm-no" onClick={handleDeleteCancel}>
                NO
              </button>
              <button className="delete-confirm-yes" onClick={handleDeleteConfirm}>
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={`edit-mode ${isEditMode ? 'active' : ''}`}>
            <div className='edit-form-container'>
            <Sidebar/>
            <div className='edit-form'>
              <h1>Edit <span>#</span>{invoice.id}</h1>
              <form action="" className='the-form'>
                <fieldset>
                  <legend>Bill Form</legend>
                  <div>
                    <label htmlFor="">Street Address</label><br />
                  <input type="text" value={editInvoice?.billFrom.streetAddress || invoice.billFrom.streetAddress} onChange={(e) => handleEditFormChange('billFrom.streetAddress', e.target.value)} placeholder='Enter Street Address' />
                  </div>
                  <div className='bill-from-address'>
                    <div>
                    <label htmlFor="">City</label><br />
                    <input type="text" value={editInvoice?.billFrom.city || invoice.billFrom.city} onChange={(e) => handleEditFormChange('billFrom.city', e.target.value)} />
                    </div>
                    <div>
                    <label htmlFor="">Post Code</label><br />
                    <input type="text" value={editInvoice?.billFrom.postCode || invoice.billFrom.postCode} onChange={(e) => handleEditFormChange('billFrom.postCode', e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="">Country</label><br />
                    <input type="text" value={editInvoice?.billFrom.country || invoice.billFrom.country} onChange={(e) => handleEditFormChange('billFrom.country', e.target.value)} />
                  </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Bill To</legend>
                  <div>
                    <label htmlFor="">Client's Name</label><br />
                  <input value={editInvoice?.clientInfo.name || invoice.clientInfo.name}
                  onChange={(e) => handleEditFormChange('clientInfo.name', e.target.value)}
                  type="text" />
                  </div>
                  <div>
                  <label htmlFor="">Client's Email</label><br />
                  <input value={editInvoice?.clientInfo.email || invoice.clientInfo.email} onChange={(e) => handleEditFormChange('clientInfo.email', e.target.value)} type="text" />
                  </div>
                  <div>
                    <label htmlFor="">Street Addess</label><br />
                    <input value={editInvoice?.clientInfo.address || invoice.clientInfo.address} onChange={(e) => handleEditFormChange('clientInfo.address', e.target.value)} type="text" name="" id="" />
                  </div>
                  <div className='bill-to-address'>
                      <div>
                      <label htmlFor="">City</label><br />
                      <input value={editInvoice?.clientInfo.city || invoice.clientInfo.city} onChange={(e) => handleEditFormChange('clientInfo.city', e.target.value)} type="text" />
                    </div>
                    <div>
                      <label htmlFor="">Post Code</label><br />
                      <input type="text" value={editInvoice?.clientInfo.postCode || invoice.clientInfo.postCode} onChange={(e) => handleEditFormChange('clientInfo.postCode', e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor="">Country</label><br />
                      <input value={editInvoice?.clientInfo.country || invoice.clientInfo.country} onChange={(e) => handleEditFormChange('clientInfo.country', e.target.value)} type="text" />
                    </div>  
                  </div>
                  <div className='invoice-date-inputs'>
                    <div><label htmlFor="">Invoice Date</label><br /><input value={editInvoice?.invoiceDetails.date || invoice.invoiceDetails.date} onChange={(e) => handleInvoiceDateChange(e.target.value)} type="date" name="" id="" /></div>
                    <div><label htmlFor="">Payment Terms</label><br />
                    <select value={editInvoice?.invoiceDetails.paymentTerms || invoice.invoiceDetails.paymentTerms || 'Next 30 days/ 1 month'} onChange={(e) => handlePaymentTermsChange(e.target.value)}>
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
                    <input value={editInvoice?.projectDescription || invoice.projectDescription} onChange={(e) => handleEditFormChange('projectDescription', e.target.value)} type="text" />
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
              {(editInvoice?.items || invoice.items).map((item, idx) => (
                <tr key={idx}>
                  <td><input value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} type="text" /></td>
                  <td><input value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', parseFloat(e.target.value) || 0)} type="number" /></td>
                  <td><input value={item.rate} onChange={(e) => handleItemChange(idx, 'rate', parseFloat(e.target.value) || 0)} type="number" name="" id="" /></td>
                  <td>${(item.quantity * item.rate).toFixed(2)}</td>
                  <td><img src={DeleteLogo} alt="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='add-new-item-button'>+ Add New item
          </button>
                </fieldset>
              </form>
              <div className='edit-action-buttons'>
                <button className='cancel-button' onClick={handleCancel}>Cancel</button> <button className='save-button' onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
            </div>
      </div>
    </div>
  )
}