import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesTab from 'components/Sales/SalesTab';

const Sales = () => {
  const [activeCatalogTabComponent, setActiveCatalogTabComponent] = useState(
    <div>Coming soon...</div>
  );
  const [currentTabName, setCurrentTabName] = useState('deliveryChallan');

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'deliveryChallan':
        return <div>Coming soon...</div>;
      case 'thippiSales':
        return <div>Coming soon...</div>;
      case 'generalSales':
        return <div>Coming soon...</div>;
      case 'salesPerformance':
        return <div>Coming soon...</div>;
      default:
        return <div>Coming soon...</div>;
    }
  };

  const handleTabSwitch = (tabName) => {
    const currentTabComp = renderTabComponent(tabName);
    setActiveCatalogTabComponent(currentTabComp);
    setCurrentTabName(tabName);
  };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        <SalesTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
};

export default Sales;
