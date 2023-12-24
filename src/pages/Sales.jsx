import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import SalesTab from 'components/Sales/SalesTab';
import DcSales from 'components/Sales/DcSales/Dc';
import TpSales from 'components/Sales/TS/Ts';
import SalesPerformance from 'components/Sales/SalesPerformance/SalesPerformance';
import GeneralSales from 'components/Sales/GS/Gs';

const Sales = () => {
  const [activeCatalogTabComponent, setActiveCatalogTabComponent] = useState(<DcSales />);
  const [currentTabName, setCurrentTabName] = useState('deliveryChallan');

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'deliveryChallan':
        return <DcSales />;
      case 'thippiSales':
        return <TpSales />;
      case 'generalSales':
        return <GeneralSales />;
      case 'salesPerformance':
        return <SalesPerformance />;
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
