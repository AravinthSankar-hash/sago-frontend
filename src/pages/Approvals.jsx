import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ApprovalHistory from '../components/Approvals/ApprovalHistory';
import ApprovalsTab from '../components/Approvals/ApprovalsTab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PendingApprovals from '../components/Approvals/PendingApprovals';
import {
  useShowApprovalsBackBtn,
  useUpdateShowApprovalsBackBtn,
  useUpdateShowApprovalHistoryDetails,
  useUpdateShowPendingApprovalDetails
} from '../store/store.js';

const Approvals = () => {
  const [activeCatalogTabComponent, setActiveCatalogTabComponent] = useState(<PendingApprovals />);
  const [currentTabName, setCurrentTabName] = useState('pendingApprovals');
  // Store
  const showApprovalsBackBtn = useShowApprovalsBackBtn();
  const updateShowApprovalsBackBtn = useUpdateShowApprovalsBackBtn();
  const updateShowApprovalHistoryDetails = useUpdateShowApprovalHistoryDetails();
  const updateShowPendingApprovalDetails = useUpdateShowPendingApprovalDetails();

  useEffect(() => {
    // On component Init clear the store to defaults
    onBackBtnClick();
  }, []);

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
  const onBackBtnClick = () => {
    updateShowApprovalsBackBtn(false);
    updateShowApprovalHistoryDetails(false);
    updateShowPendingApprovalDetails(false);
  };
  return (
    <Container style={{ background: '#EBEEF0' }}>
      <Row style={{ background: '#ffffff', height: '48px' }}>
        {showApprovalsBackBtn ? (
          <Col>
            <ArrowBackIcon
              onClick={onBackBtnClick}
              style={{ cursor: 'pointer' }}
              fontSize="medium"
            />{' '}
            <span>&nbsp;&nbsp;</span>Back
          </Col>
        ) : (
          <ApprovalsTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
        )}
      </Row>
      <Row>{activeCatalogTabComponent}</Row>
    </Container>
  );
};

export default Approvals;
