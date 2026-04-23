import modeToggle from '../assets/path.png'
import invoiceProfile from '../assets/invoiceprofile.png'
import Logo from '../assets/invoicelogo.png'
import './sidebar.css'

export function Sidebar () {
    return ( 
    <aside className='side-bar'>
        <figure className='logo-container'>
                <img src={Logo} alt="logo" className='logo-image' />
        </figure>
        <div className='profile-toggle'>
            <figure className='mode-toggle-container'>
                <img src={modeToggle} className='mode-toggle' alt="Mode" />
            </figure>
            <figure className='profile-image-container'>
                <img src={invoiceProfile} className='profile-image' alt="Profile" />
            </figure>
        </div>
    </aside>
    )
}