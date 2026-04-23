import './invoicesContainer.css'
import { statusChange } from './utils/functions.jsx';
import { invoices } from './utils/variables.jsx';
import { Link } from 'react-router'

export function Invoices () {
statusChange();
    return (
        <div className="invoices-container">
            {invoices.map(invoice => (
                <Link to={`/invoices/${invoice.id}`} key={invoice.id}   className="invoice-card" >
                    <div className="invoice-id-and-description">
                        <h2><span>#</span>{invoice.id}</h2>
                        <p className='dueDate'><span>Due </span>{invoice.invoiceDetails.dueDate}</p>
                        <p className='rate'>${invoice.items[0].rate}</p>
                    </div>
                    <div    className='client-status'>
                        <div className='client-name'>
                            <p>{invoice.clientInfo.name}</p>
                        </div>
                        <div className={`invoice-status ${invoice.status.toLowerCase()}`}>
                            <span className={`status-indicator ${invoice.status.toLowerCase()}`}></span>
                            <p>{invoice.status}</p>
                        </div>
                        <div className='preview-button-container'>
                        <button className='preview-button'><img src="../src/assets/Path 5 Copy 4.png" alt="" /></button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}