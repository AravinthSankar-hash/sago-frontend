import React, { useState } from 'react';
import CatalogTab from '../components/CatalogTab';
import { Container, Row, Col } from 'react-bootstrap';
import CatalogNewCustForm from '../components/forms/CatalogNewCust.jsx';
import CatalogNewBrokerForm from '../components/forms/CatalogNewBroker.jsx';
import CatalogNewSupplierForm from '../components/forms/CatalogNewSupplier.jsx';
import CatalogNewRawMaterialForm from '../components/forms/CatalogNewRawMaterial.jsx';
import CatalogNewVehicle from '../components/forms/CatalogNewVehicle.jsx';
import CatalogNewStaff from '../components/forms/CatalogNewStaff.jsx';
import CatalogNewProduct from '../components/forms/CatalogNewProduct.jsx';

const Catalog = () => {
  const defaultTabComponent = <CatalogNewCustForm />;
  const [activeTabComponent, setActiveTabComponent] = useState(defaultTabComponent);
  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'customers':
        return <CatalogNewCustForm />;
      case 'brokers':
        return <CatalogNewBrokerForm />;
      case 'rawmaterials':
        return <CatalogNewRawMaterialForm />;
      case 'suppliers':
        return <CatalogNewSupplierForm />;
      case 'products':
        return <CatalogNewProduct />;
      case 'vehicles':
        return <CatalogNewVehicle />;
      case 'staffs':
        return <CatalogNewStaff />;
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
      <Row>
        <Col className="d-flex flex-column justify-content-center">{activeTabComponent}</Col>
      </Row>
    </Container>
  );
};

export default Catalog;
