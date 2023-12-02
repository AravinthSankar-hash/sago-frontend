import React, { useState } from 'react';
import CatalogTab from '../components/CatalogTab';
import { Container, Row } from 'react-bootstrap';
import Customer from '../components/catalogTabs/Customer.jsx';
import Broker from '../components/catalogTabs/Broker.jsx';
import RawMaterial from '../components/catalogTabs/RawMaterial.jsx';
import Supplier from '../components/catalogTabs/Supplier.jsx';
import Product from '../components/catalogTabs/Product.jsx';
import Vehicle from '../components/catalogTabs/Vehicle.jsx';
import Staff from '../components/catalogTabs/Staff.jsx';

const Catalog = () => {
  const defaultTabComponent = <Customer />;
  const [activeTabComponent, setActiveTabComponent] = useState(defaultTabComponent);
  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'customers':
        return <Customer />;
      case 'brokers':
        return <Broker />;
      case 'rawmaterials':
        return <RawMaterial />;
      case 'suppliers':
        return <Supplier />;
      case 'products':
        return <Product />;
      case 'vehicles':
        return <Vehicle />;
      case 'staffs':
        return <Staff />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  const handleTabSwitch = (tabName) => {
    setActiveTabComponent(renderTabComponent(tabName));
  };

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        <CatalogTab handleTabSwitch={handleTabSwitch} />
      </Row>
      <Row>{activeTabComponent}</Row>
    </Container>
  );
};

export default Catalog;
