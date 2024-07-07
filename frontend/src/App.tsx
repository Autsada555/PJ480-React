import { useState } from 'react';
import './App.css'
import React from 'react';

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import './App.css';
import { Customer} from './pages/admin/Customer';

function App() {
  return (
    <BrowserRouter>
      <div className="router ">
        <Routes>
          <Route path="/customer" element={<Customer />} /> 


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



