import './homePage.css'
import { Sidebar } from './sidebar.jsx'
import { MainContent } from './mainContent.jsx';

function HomePage() {
  return (
    <div className="homePage">
        <Sidebar/>
        <MainContent/>
    </div>
  );
}
export default HomePage