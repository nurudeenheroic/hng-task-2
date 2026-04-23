/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router";
import './App.css'
import HomePage from './homePage.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  )
}
export default App
