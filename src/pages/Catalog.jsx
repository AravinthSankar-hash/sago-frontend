import React, { useState } from 'react';
import CatalogTab from '../components/CatalogTab';
import { Container, Row } from 'react-bootstrap';

const Catalog = () => {
  const defaultTabComponent = <div>Customers component here</div>;
  const [activeTabComponent, setActiveTabComponent] = useState(defaultTabComponent);
  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'customers':
        return <div>Customers component here</div>;
      case 'brokers':
        return <div>Brokers component here</div>;
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
