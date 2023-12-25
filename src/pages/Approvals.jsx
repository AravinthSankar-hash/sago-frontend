import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ApprovalHistory from '../components/Approvals/ApprovalHistory';
import ApprovalsTab from '../components/Approvals/ApprovalsTab';
import PendingApprovals from '../components/Approvals/PendingApprovals';

const Approvals = () => {
  const [activeCatalogTabComponent, setActiveCatalogTabComponent] = useState(<PendingApprovals />);
  const [currentTabName, setCurrentTabName] = useState('pendingApprovals');

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'pendingApprovals':
        return <PendingApprovals />;
      case 'approvalHistory':
        return <ApprovalHistory />;
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
      <Row style={{ background: '#ffffff', height: '48px' }}>
        <ApprovalsTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
};

export default Approvals;
