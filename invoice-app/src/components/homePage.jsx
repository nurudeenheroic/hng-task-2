import './homePage.css'
import { Sidebar } from './sidebar.jsx'
import { MainContent } from './mainContent.jsx';

function homePage() {
  return (
    <div className="App">
        <Sidebar/>
        <MainContent/>
    </div>
  );
}
export default homePage