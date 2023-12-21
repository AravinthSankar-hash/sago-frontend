import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Catalog from './pages/Catalog.jsx';
import Invoices from './pages/Invoices.jsx';
import Procurements from './pages/Procurements.jsx';
import TapicoPurchase from './components/tapicoPurchase/TapicoPurchase.jsx';
import Expenses from './pages/Expenses.jsx';
import Payments from 'components/payments/Payments.jsx';
import Approvals from 'components/Approvals/Approvals.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Invoices />} />
      <Route path="/purchase" element={<TapicoPurchase />} />
      <Route path="/procurement" element={<Procurements />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/expense" element={<Expenses />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/approvals" element={<Approvals />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
