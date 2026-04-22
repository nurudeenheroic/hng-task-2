import { useState } from 'react'
import './App.css'
import { Sidebar } from './sidebar.jsx'
import { MainContent } from './mainContent.jsx';

function App() {
  return (
    <div className="App">
        <div className="App">
             <Sidebar/>
        </div>
        <div>
            <MainContent/>
        </div>
    </div>
  );
}
export default App
