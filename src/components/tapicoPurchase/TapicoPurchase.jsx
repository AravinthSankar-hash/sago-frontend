import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import TapicoPurchaseTab from './TapicoPurchaseTab.jsx';
import {
  useUpdateActiveTPTabComponent,
  useActiveTPTabComponent,
  useShowTPBackBtn,
  useUpdateShowTPBackBtn,
  useUpdateShowPurhcaseDetails,
  useUpdateShowTPPurchaseNewForm
} from '../../store/store.js';
import Purchases from './PurchasesTab.jsx';
import BrokerReports from './BrokerReportsTab.jsx';
import Reports from './ReportsTab.jsx';

function TapicoPurchase() {
  // Store
  const showBackButton = useShowTPBackBtn(); // Bool to show/hide the back btn
  const updateShowTPBackBtn = useUpdateShowTPBackBtn(); // Bool to show/hide the back TP btn
  const activeTPTabComponent = useActiveTPTabComponent(); // Method to get the active tapico tab comp
  const updateActiveTPTabComponent = useUpdateActiveTPTabComponent(); // Method to update the active component, whenver the tab is clicked
  const updateShowPurhcaseDetails = useUpdateShowPurhcaseDetails();
  const updateShowTPPurchaseNewForm = useUpdateShowTPPurchaseNewForm();
  const onBackBtnClick = () => {
    updateShowTPBackBtn(false);
    updateShowTPPurchaseNewForm(false);
    updateShowPurhcaseDetails(false);
  };

  const renderTabComponent = (tabName) => {
    switch (tabName) {
      case 'purchases':
        return <Purchases />;
      case 'brokerreports':
        return <BrokerReports />;
      case 'reports':
        return <Reports />;
      default:
        return <div>Coming soon...</div>;
    }
  };
  useEffect(() => {
    updateActiveTPTabComponent(<Purchases />);
  }, []);
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
      <Row>{activeTPTabComponent}</Row>
    </Container>
  );
}

export default TapicoPurchase;
