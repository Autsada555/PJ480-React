import './App.css'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css';
import { Customer} from './pages/admin/Customer';
import { AddMenu } from './pages/admin/AddMenu';
import { Management } from './pages/admin/Management';
import { CheckPayment } from './pages/admin/CheckPayment';

import { Home } from './pages/customer/Home';

function App() {
  return (
  <div>
    <BrowserRouter>
      <div className="router ">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/customer" element={<Customer />} /> 
          <Route path="/addmenu" element={<AddMenu />}/>
          <Route path="/management" element={<Management />} /> 
          <Route path="/checkpayment" element={<CheckPayment />}/>
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;



