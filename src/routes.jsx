import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Catalog from './pages/Catalog.jsx';
import Invoices from './pages/Invoices.jsx';
import Procurements from './pages/Procurements.jsx';
import Expenses from './pages/Expenses.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Invoices />} />
      <Route path="/procurement" element={<Procurements />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/expense" element={<Expenses />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
