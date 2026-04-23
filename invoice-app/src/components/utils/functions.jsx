import { getInvoiceStatusElements, getInvoiceStatusContainers, getStatusIndicators, STATUS_COLORS } from './variables.jsx'

export function statusChange() {
    const invoiceStatusContainers = getInvoiceStatusContainers();
    const invoiceStatus = getInvoiceStatusElements();
    const statusIndicator = getStatusIndicators();

    invoiceStatusContainers.forEach(container => {
        const statusClass = container.classList.contains('pending') ? 'pending' :
                          container.classList.contains('paid') ? 'paid' : 'draft';
        container.style.backgroundColor = STATUS_COLORS[statusClass].bg;
    });

    invoiceStatus.forEach(status => {
        const statusText = status.textContent;
        const statusKey = statusText.toLowerCase();
        if (STATUS_COLORS[statusKey]) {
            status.style.color = STATUS_COLORS[statusKey].text;
        }
    });
    
    statusIndicator.forEach(indicator => {
        const statusClass = indicator.classList.contains('pending') ? 'pending' :
                          indicator.classList.contains('paid') ? 'paid' : 'draft';
        indicator.style.backgroundColor = STATUS_COLORS[statusClass].indicator;
    });
}

// Calculate due date based on invoice date and payment terms
export function calculateDueDate(invoiceDate, paymentTerms) {
    const date = new Date(invoiceDate)
    const daysMap = {
        'Next 1 day': 1,
        'Next 2 days': 2,
        'Next 3 days': 3,
        'Next 7 days': 7,
        'Next 14 days': 14,
        'Next 30 days/ 1 month': 30
    }
    
    const days = daysMap[paymentTerms] || 0
    date.setDate(date.getDate() + days)
    
    return date.toISOString().split('T')[0]
}

// Generate unique invoice ID
export function generateInvoiceId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    let id = ''
    for (let i = 0; i < 2; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    for (let i = 0; i < 4; i++) {
        id += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return id
}

// Calculate total amount for invoice items
export function calculateInvoiceTotal(items) {
    return items.reduce((acc, item) => acc + (item.quantity * item.rate), 0)
}

// Handle form data changes for nested objects
export function handleFormChange(currentState, path, value) {
    const updatedState = JSON.parse(JSON.stringify(currentState))
    const keys = path.split('.')
    let obj = updatedState
    for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]]
    }
    obj[keys[keys.length - 1]] = value
    return updatedState
}

// Handle item changes in invoice items array
export function handleItemChange(items, index, field, value) {
    const updatedItems = JSON.parse(JSON.stringify(items))
    updatedItems[index][field] = value
    return updatedItems
}

// Add new item to invoice items array
export function addNewItem(items) {
    return [...items, { description: '', quantity: 1, rate: 0 }]
}

// Delete item from invoice items array
export function deleteItem(items, index) {
    if (items.length > 1) {
        return items.filter((_, i) => i !== index)
    }
    return items
}