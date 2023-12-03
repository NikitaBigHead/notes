import {Route,Routes} from "react-router-dom";
import NotesPage from './pages/NotesPage/NotesPage';
import ArchivePage from "./pages/ArchivePage/ArchivePage";

function App() {


  // const location = useLocation();
  return (
    <Routes>
      <Route path='/' element = {<NotesPage/>}/>
      {/* <Route path="/archive" element = {<ArchivePage/>}/> */}
    </Routes>    
  );}

export default App;
