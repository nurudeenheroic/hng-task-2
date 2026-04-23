/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router";
import homePage from "./homePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<homePage/>}></Route>
    </Routes>
  )
}
export default App
