import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TapicoPurchaseTab from './TapicoPurchaseTab.jsx';
import { useUpdateActiveTPTabComponent } from '../../store/store.js';

function TapicoPurchase() {
  // Store
  const updateActiveTPTabComponent = useUpdateActiveTPTabComponent(); // Method to update the active component, whenver the tab is clicked
  const showBackButton = false;
  const onBackBtnClick = () => {};
  const activeCatalogTabComponent = <></>;

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'purcases':
        return <div>Purchases</div>;
      case 'brokerreports':
        return <div>Broker reports</div>;
      case 'reports':
        return <div>Reports</div>;
      default:
        return <div>Coming soon...</div>;
    }
  };
  const handleTabSwitch = (tabName) => {
    const currentTabComp = renderTabComponent(tabName);
    // On every tab switch update the active component
    updateActiveTPTabComponent(currentTabComp);
  };

  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '56px' }}>
        {showBackButton ? (
          <Col>
            <ArrowBackIcon
              onClick={onBackBtnClick}
              style={{ cursor: 'pointer' }}
              fontSize="medium"
            />{' '}
            <span>&nbsp;&nbsp;</span>Back
          </Col>
        ) : (
          <TapicoPurchaseTab handleTabSwitch={handleTabSwitch} />
        )}
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
}

export default TapicoPurchase;
