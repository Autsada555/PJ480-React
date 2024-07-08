import './App.css'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css';
import { Customer} from './pages/admin/Customer';


function App() {
  return (
  <div>
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



