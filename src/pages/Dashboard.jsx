import { useState, useRef, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import DateSelector from '../components/helper/DateSelector.jsx';
import DashboardTab from '../components/dashboard/DashboardTab.jsx';
import ProductGraph from 'components/dashboard/ProductGraph.jsx';
import CommonGraph from 'components/dashboard/CommonGraph.jsx';
import GeneralService from '../services/generic.api.js';

function Dashboard() {
  const containerRef = useRef();

  const gridStyle = useMemo(
    () => ({
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '600px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto',
      paddingRight: '0'
    }),
    []
  );

  const tableContainer = useMemo(
    () => ({
      borderRadius: '10px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto'
    }),
    []
  );

  const [showProductGraph, setShowProductGraph] = useState(true);
  const switchTabHandler = (showHideBool) => {
    setShowProductGraph(showHideBool);
  };

  useEffect(() => {
    invokeDashboardStatsAPI();
  }, []);

  const [filterPayload, setFilterPayload] = useState({});
  const [graphData, setGraphData] = useState();
  function invokeDashboardStatsAPI() {
    GeneralService.getDashboardStats(filterPayload)
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => {
        console.log('Error in invokeDashboardStatsAPI', error);
      });
  }
  return (
    <>
      <div>
        <Row
          style={{
            background: '#ffffff',
            padding: '20px'
          }}>
          Dashboard
        </Row>
        <Row style={{ background: '#ffffff', marginBottom: '15px' }}>
          <Col lg="2">
            <DateSelector size="smaller" customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector customLabel="To"></DateSelector>
          </Col>
          <Col lg={{ span: 2, offset: 3 }} className="justify-content-end">
            <Form.Label className="">Total Sales overall</Form.Label>
            <div style={{ fontSize: '22px', fontWeight: 'bolder' }}>
              ₹{graphData?.totalTransactions?.totalSales || 0}
            </div>
          </Col>
          <Col lg="2" className="justify-content-end">
            <Form.Label>Total Purchases</Form.Label>
            <div style={{ fontSize: '22px', fontWeight: 'bolder' }}>
              ₹
              {graphData?.totalTransactions?.totalProAmount +
                graphData?.totalTransactions?.totalTpAmount +
                graphData?.totalTransactions?.totalExpense}
            </div>
          </Col>
        </Row>
      </div>
      {graphData && (
        <Container className="ag-theme-alpine" style={{ background: '#EBEEF0' }}>
          <div ref={containerRef} className="m-3 mt-5" style={tableContainer}>
            <DashboardTab showProductGraph={showProductGraph} switchTab={switchTabHandler} />
            <Container style={gridStyle}>
              <>
                <ProductGraph statisticsData={graphData} />
              </>
            </Container>
          </div>
        </Container>
      )}
    </>
  );
}

export default Dashboard;
