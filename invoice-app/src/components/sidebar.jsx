import modeToggle from '../assets/path.png'
import invoiceProfile from '../assets/invoiceprofile.png'
import Logo from '../assets/invoicelogo.png'
import './sidebar.css'
import { useState, useEffect } from 'react'

export function Sidebar () {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode')
        } else {
            document.body.classList.remove('dark-mode')
        }
    }, [isDarkMode])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }

    return ( 
    <aside className='side-bar'>
        <figure className='logo-container'>
                <img src={Logo} alt="logo" className='logo-image' />
        </figure>
        <div className='profile-toggle'>
            <figure className='mode-toggle-container'>
                <div 
                    className='mode-toggle'
                    onClick={toggleDarkMode}
                >
                    <img src={modeToggle} alt="Mode Toggle" className={isDarkMode ? 'dark-mode-active' : ''} />
                </div>
            </figure>
            <figure className='profile-image-container'>
                <img src={invoiceProfile} className='profile-image' alt="Profile" />
            </figure>
        </div>
    </aside>
    )
}