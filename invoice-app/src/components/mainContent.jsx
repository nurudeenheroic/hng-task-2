import { useState } from 'react'
import './mainContent.css'
import filterIcon from '../assets/Path 2.png'
import plusSign from '../assets/Group 3.png'
import { Empty } from './empty.jsx';
import { Header } from './header.jsx';

export function MainContent () {

    return (
        <main className='main-content'>
            <Header/>
            <Empty/>
            <div className='invoices-container'>
            </div>
        </main>
    )
}