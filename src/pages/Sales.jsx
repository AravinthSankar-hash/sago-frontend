import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container, Row, Col } from 'react-bootstrap';
import SalesTab from 'components/sales/SalesTab.jsx';
import DcSales from 'components/sales/DcSales/Dc.jsx';
import TpSales from 'components/sales/TS/Ts.jsx';
import SalesPerformance from '../components/sales/SalesPerformance/SalesPerformance.jsx';
import GeneralSales from 'components/sales/GS/Gs.jsx';
// Store
import {
  useShowSalesBackBtn,
  useUpdateShowSalesBackBtn,
  useUpdateShowDCSalesNewForm,
  useUpdateShowDCDetails,
  useActiveSalesTabComponent,
  useUpdateActiveSalesTabComponent,
  useUpdateShowTSSalesNewForm,
  useUpdateShowTSDetails,
  useUpdateShowGSSalesNewForm,
  useUpdateShowGSDetails
} from '../store/store.js';

const Sales = () => {
  // Internal state
  const [currentTabName, setCurrentTabName] = useState('deliveryChallan');

  // Store
  const activeSalesTabComponent = useActiveSalesTabComponent(); // Component initially will be Sales component, will be updated whenever user clicks on any tab
  const updateActiveSalesTabComponent = useUpdateActiveSalesTabComponent(); // Method to update the active component, whenver the tab is clicked

  const showBackButton = useShowSalesBackBtn(); // Bool to show/hide the back btn
  const updateShowSalesBackBtn = useUpdateShowSalesBackBtn(); // Method to update bool, if back btn is clicked
  // DC
  const updateShowDCSalesNewForm = useUpdateShowDCSalesNewForm(); // Show DC Sales Dashboard
  const updateShowDCDetails = useUpdateShowDCDetails(); // Show DC Details Dashboard
  // TS
  const updateShowTSSalesNewForm = useUpdateShowTSSalesNewForm(); // Show TS Sales Dashboard
  const updateShowTSDetails = useUpdateShowTSDetails(); // Show TS Details Dashboard

  // GS
  const updateShowGSSalesNewForm = useUpdateShowGSSalesNewForm(); // Show GS Sales Dashboard
  const updateShowGSDetails = useUpdateShowGSDetails(); // Show GS Details Dashboard

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

  useEffect(() => {
    updateActiveSalesTabComponent(<DcSales />);
    updateShowSalesBackBtn(false);
  }, []);

  const handleTabSwitch = (tabName) => {
    const currentTabComp = renderTabComponent(tabName);
    updateActiveSalesTabComponent(currentTabComp);
    setCurrentTabName(tabName);
  };

  const onBackBtnClick = () => {
    updateShowSalesBackBtn(false);
    updateShowDCSalesNewForm(false);
    updateShowDCDetails(false);
    updateShowTSSalesNewForm(false);
    updateShowTSDetails(false);
    updateShowGSDetails(false);
    updateShowGSSalesNewForm(false);
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
          <SalesTab handleTabSwitch={handleTabSwitch} tabToSelect={currentTabName} />
        )}
      </Row>
      <Row>{activeSalesTabComponent}</Row>
    </Container>
  );
};

export default Sales;
