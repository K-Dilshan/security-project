import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Requests from './Pages/Requests';
import Inventory from './Pages/Inventory';
import Login from './Pages/Login';
import Register from './Pages/Register';
import History from './Pages/History';
import GoodsReciept from './Pages/GoodsReciept';
import GoodsIssue from './Pages/GoodsIssue';
import ClientHome from './Pages/ClientHome';
import ClientInventory from './Pages/ClientInventory';
import ManagerRoute from './components/ManagerRoute';
import EmployeeRoute from './components/EmployeeRoute';
import OTPVerification from './Pages/OTPVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/verify-otp" element={<OTPVerification/>}/>
        <Route path = "/" element = {<ManagerRoute> <Home/> </ManagerRoute>}/>
        <Route path="/Requests" element={<ManagerRoute> <Requests/> </ManagerRoute>}/>
        <Route path="/Inventory" element={<ManagerRoute> <Inventory/> </ManagerRoute>}/>
        <Route path="/Register" element={<ManagerRoute> <Register/> </ManagerRoute>}/>
        <Route path="/History" element={<ManagerRoute> <History/> </ManagerRoute>}/>

        <Route path="/ClientHome" element={<EmployeeRoute> <ClientHome/> </EmployeeRoute>}/>
        <Route path="/GoodsReciept" element={<EmployeeRoute> <GoodsReciept/> </EmployeeRoute>}/>
        <Route path="/GoodsIssue" element={<EmployeeRoute> <GoodsIssue/> </EmployeeRoute>}/>
        <Route path="/ClientInventory" element={<EmployeeRoute> <ClientInventory/> </EmployeeRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;