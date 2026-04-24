import './mainContent.css'
import { Empty } from './empty.jsx';
import { Header } from './header.jsx';
import { Invoices } from './invoicesContainer.jsx'
import { useState, useMemo, useEffect, useCallback } from 'react'
import { getInvoicesData, addInvoice, updateInvoice, deleteInvoice } from './utils/variables.jsx'

export function MainContent () {
    const [filterOptions, setFilterOptions] = useState({
        draft: false,
        pending: false,
        paid: false
    })

    const [currentInvoices, setCurrentInvoices] = useState([])

    // Refresh invoices from localStorage when component mounts
    const refreshInvoices = useCallback(() => {
        const freshInvoices = getInvoicesData()
        setCurrentInvoices(freshInvoices)
    }, [])

    useEffect(() => {
        refreshInvoices()
        
        // Listen for storage changes from other tabs
        const handleStorageChange = (e) => {
            if (e.key === 'invoice-app-data') {
                refreshInvoices()
            }
        }
        
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [refreshInvoices])

    const filteredInvoices = useMemo(() => {
        const activeFilters = Object.keys(filterOptions).filter(key => filterOptions[key])
        
        if (activeFilters.length === 0) {
            return currentInvoices
        }
        
        return currentInvoices.filter(invoice => 
            activeFilters.includes(invoice.status.toLowerCase())
        )
    }, [filterOptions, currentInvoices])

    const handleFilterChange = (newFilters) => {
        setFilterOptions(newFilters)
    }

    return (
        <main className='main-content'>
            <Header onFilterChange={handleFilterChange} invoiceCount={filteredInvoices.length} />
            <Empty invoiceCount={filteredInvoices.length} />
            <Invoices invoices={filteredInvoices} />
        </main>
    )
}