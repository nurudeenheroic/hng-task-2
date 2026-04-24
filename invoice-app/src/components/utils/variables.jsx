import { getInvoices, setInvoices, addInvoice, updateInvoice, deleteInvoice } from './storage.js';

// DOM queries moved to functions to prevent import-time execution
export const getInvoiceStatusElements = () => document.querySelectorAll('.invoice-status p');
export const getInvoiceStatusContainers = () => document.querySelectorAll('.invoice-status');
export const getStatusIndicators = () => document.querySelectorAll('.status-indicator');

// Remove mutable state - use functions instead
export const getInvoicesData = () => getInvoices();

// Export localStorage functions for use in components
export { addInvoice, updateInvoice, deleteInvoice };

// Reusable constants
export const PAYMENT_TERMS_OPTIONS = {
    'Next 1 day': 1,
    'Next 2 days': 2,
    'Next 3 days': 3,
    'Next 7 days': 7,
    'Next 14 days': 14,
    'Next 30 days/ 1 month': 30
};

export const INVOICE_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const INVOICE_ID_NUMBERS = '0123456789';

export const STATUS_COLORS = {
    pending: {
        bg: 'rgba(255, 143, 0, 0.15)',
        text: 'rgba(255, 143, 0, 1)',
        indicator: 'rgba(255, 143, 0, 1)'
    },
    paid: {
        bg: 'rgba(51, 214, 159, 0.15)',
        text: 'rgba(51, 214, 159, 1)',
        indicator: 'rgba(51, 214, 159, 1)'
    },
    draft: {
        bg: 'rgba(55, 59, 83, 0.15)',
        text: 'rgba(55, 59, 83, 1)',
        indicator: 'rgba(55, 59, 83, 1)'
    }
};

export const EMPTY_INVOICE_STATE = {
    id: '',
    projectDescription: '',
    status: 'pending',
    billFrom: {
        streetAddress: '',
        city: '',
        postCode: '',
        country: ''
    },
    clientInfo: {
        name: '',
        email: '',
        address: '',
        city: '',
        postCode: '',
        country: ''
    },
    invoiceDetails: {
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        paymentTerms: 'Next 30 days/ 1 month'
    },
    items: [
        { description: '', quantity: 1, rate: 0 }
    ]
};

export const EMPTY_ITEM_STATE = { description: '', quantity: 1, rate: 0 };