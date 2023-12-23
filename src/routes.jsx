import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Catalog from './pages/Catalog.jsx';
import Invoices from './pages/Invoices.jsx';
import Procurements from './pages/Procurements.jsx';
import TapicoPurchase from './components/tapicoPurchase/TapicoPurchase.jsx';
import Expenses from './pages/Expenses.jsx';
import Dashboard from 'components/dashboard/Dashboard.jsx';
import Payments from 'pages/Payments.jsx';
import Sales from 'pages/Sales.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Invoices />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/purchase" element={<TapicoPurchase />} />
      <Route path="/procurement" element={<Procurements />} />
      <Route path="/expense" element={<Expenses />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/invoice" element={<Invoices />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
