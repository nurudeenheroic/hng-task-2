
import './header.css'
import filterIcon from '../assets/Path 2.png'
import plusSign from '../assets/Group 3.png'
import { useNavigate } from 'react-router'
import { useState, useEffect } from 'react'

export function Header({ onFilterChange, invoiceCount = 0 }) {
    const navigate = useNavigate()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filterOptions, setFilterOptions] = useState({
        draft: false,
        pending: false,
        paid: false
    })

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const handleFilterChange = (status) => {
        const newFilterOptions = {
            ...filterOptions,
            [status.toLowerCase()]: !filterOptions[status.toLowerCase()]
        }
        setFilterOptions(newFilterOptions)
        onFilterChange(newFilterOptions)
    }

    const closeFilter = () => {
        setIsFilterOpen(false)
    }

    const handleFilterButtonClick = (e) => {
        e.stopPropagation()
        toggleFilter()
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isFilterOpen && !e.target.closest('.filter-button')) {
                closeFilter()
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isFilterOpen])

    return (
        <header className='main-header'>
            <div className='invoice-heading-section'>
                <h1 className='invoice-heading'>
                    Invoices
                </h1>
                <p className='invoice-declaration'>
                    {invoiceCount !== undefined && invoiceCount !== 0 
                        ? `There are ${invoiceCount} invoice${invoiceCount === 1 ? '' : 's'} available`
                        : 'There are 5 invoices available'
                    }
                </p>
            </div>
            <div className='filter-and-newInvoice'>
                <div className='filter'>
                    <label for="filter" className='filter-label'>Filter by status</label>
                    <label for="filter" className='filter-label2'>Filter</label> 
                    <button className='filter-button' onClick={handleFilterButtonClick}>
                        <img src={filterIcon} alt="Filter" className={`filter-icon ${isFilterOpen ? 'rotated' : ''}`} /> 
                        <ul name="filter" id="filter" className={`filter-select ${isFilterOpen ? 'show-filter' : ''}`} onClick={(e) => e.stopPropagation()}>
                            <li>
                                <input 
                                    type="checkbox" 
                                    name="Draft" 
                                    id="Draft" 
                                    checked={filterOptions.draft}
                                    onChange={() => handleFilterChange('Draft')}
                                />
                                <label htmlFor="Draft">Draft</label>
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    name="Pending" 
                                    id="Pending" 
                                    checked={filterOptions.pending}
                                    onChange={() => handleFilterChange('Pending')}
                                />
                                <label htmlFor="Pending">Pending</label>
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    name="Paid" 
                                    id="Paid" 
                                    checked={filterOptions.paid}
                                    onChange={() => handleFilterChange('Paid')}
                                />
                                <label htmlFor="Paid">Paid</label>
                            </li>
                        </ul>
                    </button>
                </div>
                <div className='new-invoice'>
                    <button className='new-invoice-button' onClick={() => navigate('/new-invoice')}><img src={plusSign} alt="New Invoice" className='plusSign' /> <span className='new1'>
                        New Invoice
                        </span>
                        <span className='new2'>
                            New
                        </span>
                        </button>
                </div>
            </div>
            </header>
    )
}