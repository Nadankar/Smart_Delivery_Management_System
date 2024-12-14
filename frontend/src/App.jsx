import React from "react";
import Dashboard from "./components/Dashboard";
import Partners from "./components/Partners";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Orders from "./components/Orders";
import Assignment from "./components/Assignment";
import PartnerRegistration from "./components/PartnerRegistration";
 


const App = () => {
  return (
    
    <Router>
      <div>
        <Navbar/>
        <div className="mt-40">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/partners" element={<Partners/>} />
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/Assignments" element={<Assignment/>} />
            <Route path="/partnerRegistration" element={<PartnerRegistration/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
