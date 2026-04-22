import { useState } from 'react'
import './mainContent.css'
import filterIcon from '../assets/Path 2.png'
import plusSign from '../assets/Group 3.png'
import EmptyDisplay from '../assets/Email campaign_Flatline 2.png';

export function MainContent () {

    function toggleFilter () {
        const filterSelect = document.querySelector('.filter-select');
        filterSelect.classList.toggle('show-filter');
    }
    return (
        <main className='main-content'>
            <header className='main-header'>
            <div className='invoice-heading-section'>
                <h1 className='invoice-heading'>
                    Invoices
                </h1>
                <p className='invoice-declaration'>
                    No invoices
                </p>
            </div>
            <div className='filter-and-newInvoice'>
                <div className='filter'>
                    <label for="filter" className='filter-label'>Filter by status</label>
                    <label for="filter" className='filter-label2'>Filter</label> <button className='filter-button' onClick={toggleFilter}><img src={filterIcon} alt="Filter" /> <ul name="filter" id="filter" className='filter-select'>
                        <li><input type="checkbox" name="Draft" id="Draft" /><label htmlFor="Draft">Draft</label></li>
                        <li><input type="checkbox" name="Pending" id="Pending" /><label htmlFor="Pending">Pending</label></li>
                        <li><input type="checkbox" name="Paid" id="Paid" /><label htmlFor="Paid">Paid</label></li>
                    </ul>
                    </button>
                </div>
                <div className='new-invoice'>
                    <button className='new-invoice-button'><img src={plusSign} alt="New Invoice" className='plusSign' /> <span className='new1'>
                        New Invoice
                        </span>
                        <span className='new2'>
                            New
                        </span>
                        </button>
                </div>
            </div>
            </header>
            <div className='empty'>
                <figure>
        <img src={EmptyDisplay} alt="No invoices to display "/>
                </figure>
                <h3>There is nothing here</h3>
                <p>Create an invoice by clicking the <br /> "New Invoice" button and get started</p>
            </div>
        </main>
    )
}