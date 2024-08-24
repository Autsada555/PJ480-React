import './App.css'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css';
import { AddMenu } from './pages/admin/AddMenu';
import { Management } from './pages/admin/Management';
import { CheckPayment } from './pages/admin/CheckPayment';
import {Payment} from './pages/customer/payment';
import {Order} from './pages/customer/order';
import { Home } from './pages/customer/Home';
import {Register} from './pages/customer/register';
import {Login} from './pages/customer/login';
import { Delivery } from './pages/admin/Delivery';
import {History} from './pages/customer/History';
import {DiabetesFood} from './pages/customer/DiabetesFood';
import {KidnyFood} from './pages/customer/KidnyFood';
import {GastritistFood} from './pages/customer/Gastritist';
import {ThyroidFood} from './pages/customer/Thyroid';
import {ListUser} from './pages/admin/ListUser';
import  Customer  from "./pages/admin/Customer";

function App() {
  return (
  <div>
    <BrowserRouter>
      <div className="router ">
        <Routes>
          <Route path="/home" element={<Home />}/>
          <Route path="/customer" element={<Customer />} /> 
          <Route path="/addmenu" element={<AddMenu />}/>
          <Route path="/management" element={<Management />} /> 
          <Route path="/checkpayment" element={<CheckPayment />}/>
          <Route path="/payment" element={<Payment />}/>
          <Route path="/order" element={<Order />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/delivery" element={<Delivery />}/>
          <Route path="/history" element={<History />}/>
          <Route path="/diabetesfood" element={<DiabetesFood />}/>
          <Route path="/kidnyfood" element={<KidnyFood />}/>
          <Route path="/gastritistfood" element={<GastritistFood />}/>
          <Route path="/thyroidfood" element={<ThyroidFood />}/>
          <Route path="/listuser" element={<ListUser />}/>

        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;



