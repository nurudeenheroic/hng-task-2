import './empty.css'
import EmptyDisplay from '../assets/Email campaign_Flatline 2.png'

export function Empty({ invoiceCount }) {
    if (invoiceCount > 0) {
        return null
    }
    
    return (
        <div className='empty'>
                    <figure>
            <img src={EmptyDisplay} alt="No invoices to display "/>
                    </figure>
                    <h3>There is nothing here</h3>
                    <p>Create an invoice by clicking the <br /> "New Invoice" button and get started</p>
        </div>
    )
}