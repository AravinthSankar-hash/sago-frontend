import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CompletedPayments from '../components/payments/CompletedPayments';
import PaymentsTab from '../components/payments/PaymentsTab';
import PendingPayments from '../components/payments/PendingPayments';
import Transactions from '../components/payments/Transactions';

const Payments = () => {
  // Store
  const [activeCatalogTabComponent, setActiveCatalogTabComponent] = useState(<PendingPayments />);
  const [currentTabName, setCurrentTabName] = useState('pendingPayments');

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'pendingPayments':
        return <PendingPayments />;
      case 'completedPayments':
        return <CompletedPayments />;
      case 'txnHistory':
        return <Transactions />;
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
        <PaymentsTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
};

export default Payments;
