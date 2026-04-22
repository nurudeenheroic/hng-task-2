import { useState } from 'react'
import './App.css'
import { Sidebar } from './sidebar.jsx'
import { MainContent } from './mainContent.jsx';

function App() {
  return (
    <div className="App">
        <Sidebar/>
        <MainContent/>
    </div>
  );
}
export default App
