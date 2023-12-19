import Customer from '../components/catalogTabs/Customer.jsx';
import Broker from '../components/catalogTabs/Broker.jsx';
import RawMaterial from '../components/catalogTabs/RawMaterial.jsx';
import Supplier from '../components/catalogTabs/Supplier.jsx';
import Product from '../components/catalogTabs/Product.jsx';
import Vehicle from '../components/catalogTabs/Vehicle.jsx';
import Staff from '../components/catalogTabs/Staff.jsx';

export const CatalogTabItems = [
  {
    idx: 0,
    name: 'customers',
    component: <Customer />
  },
  {
    idx: 1,
    name: 'brokers',
    component: <Broker />
  },
  {
    idx: 2,
    name: 'rawmaterials',
    component: <RawMaterial />
  },
  {
    idx: 3,
    name: 'suppliers',
    component: <Supplier />
  },
  {
    idx: 4,
    name: 'products',
    component: <Product />
  },
  {
    idx: 5,
    name: 'vehicles',
    component: <Vehicle />
  },
  {
    idx: 6,
    name: 'staffs',
    component: <Staff />
  }
];
