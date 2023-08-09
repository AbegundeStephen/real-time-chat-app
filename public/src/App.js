import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat';
import Login from "./pages/Login"
import Register from "./pages/Register"
import SetAvatarImage from './components/SetAvatarImage';
// import Contacts from './components/Contacts';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/> 
    <Route path='/setavatar' element={<SetAvatarImage/>}/>
    {/* <Route path='/contacts' element={<Contacts/>}/> */}
    <Route path='/' element={<Chat/>}/>   
    </Routes>
    </BrowserRouter>

  );
}

export default App;
