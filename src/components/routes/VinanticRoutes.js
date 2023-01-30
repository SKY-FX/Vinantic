import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { VINANTIC_DESCRIPTION } from '../FO/constants';
import VinanticFO from '../FO/VinanticFO';
import VinanticBO from '../BO/VinanticBO';
import { NavBar } from '../routes/NavBar';
import NoMatchRoute from './NoMatchRoute';

const VinanticRoutes = () => (
  <div className='h-screen'>
    <Router>
      <NavBar />
      <Routes>
        <Route path="fo/vinantic" element={<VinanticFO description={VINANTIC_DESCRIPTION} />} />
        <Route path="bo/vinantic" element={<VinanticBO />} />
        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
    </Router>
  </div>
)

export default VinanticRoutes;
