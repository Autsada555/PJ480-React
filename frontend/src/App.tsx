import './App.css'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css';
import { Customer} from './pages/admin/Customer';
import Navbar from './pages/customer/navbar';

function App() {
  return (
  <div>
    <Navbar />
    <BrowserRouter>
      <div className="router ">
        <Routes>
          <Route path="/customer" element={<Customer />} /> 

        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;



