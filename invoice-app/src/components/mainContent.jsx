import './mainContent.css'
import { Empty } from './empty.jsx';
import { Header } from './header.jsx';
import { Invoices } from './invoicesContainer.jsx'
import { useState, useMemo, useEffect } from 'react'
import { invoices, getInvoices } from './utils/variables.jsx'

export function MainContent () {
    const [filterOptions, setFilterOptions] = useState({
        draft: false,
        pending: false,
        paid: false
    })

    const [currentInvoices, setCurrentInvoices] = useState([])

    // Refresh invoices from localStorage when component mounts
    useEffect(() => {
        const freshInvoices = getInvoices()
        setCurrentInvoices(freshInvoices)
    }, [])

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