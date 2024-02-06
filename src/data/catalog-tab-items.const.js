import Customer from '../components/catalog/catalogTabs/Customer.jsx';
import Broker from '../components/catalog/catalogTabs/Broker.jsx';
import RawMaterial from '../components/catalog/catalogTabs/RawMaterial.jsx';
import Supplier from '../components/catalog/catalogTabs/Supplier.jsx';
import Product from '../components/catalog/catalogTabs/Product.jsx';
import Vehicle from '../components/catalog/catalogTabs/Vehicle.jsx';
import Staff from '../components/catalog/catalogTabs/Staff.jsx';

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
