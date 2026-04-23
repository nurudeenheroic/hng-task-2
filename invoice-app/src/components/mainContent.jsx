
import './mainContent.css'
import { Empty } from './empty.jsx';
import { Header } from './header.jsx';
import { Invoices } from './invoicesContainer.jsx'

export function MainContent () {

    return (
        <main className='main-content'>
            <Header/>
            <Empty/>
            <Invoices/>
        </main>
    )
}