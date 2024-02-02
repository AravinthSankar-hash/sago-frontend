import { Container } from '@mui/material';
import DateSelector from 'components/helper/DateSelector';
import bagIcon from '../../assets/images/tp_reports_bag.svg';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chart from 'react-apexcharts';
import Select from '@mui/material/Select';
import { Col, Row, Image } from 'react-bootstrap';
import { areaGraphOptions, areaGraphDataPoints } from '../dashboard/graph-spec.js';
import '../../css/index.css';
import ProService from 'services/purchase.api.js';
import { SERVICES } from '../../services/api.const';
import { useState, useEffect } from 'react';

function Reports() {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '14px' };
  const fontValue = { font: 'Roboto', fontSize: '14px' };
  const leftRowStyle = {
    backgroundColor: 'white',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '15px'
  };

  const [brokerGraphReports, setBrokerGraphReports] = useState([]);
  const [graphData, setGraphData] = useState(null);
  useEffect(() => {
    invokeReportsAPI();
  }, []);

  const invokeReportsAPI = () => {
    ProService.getData(SERVICES.TP.ROUTES.REPORT)
      .then((response) => {
        setBrokerGraphReports(response.data.data);
        setGraphData(response.data.totalPurchaseGraphDetails);
      })
      .catch((error) => {
        console.log('Error in getting reports data', error);
      });
  };

  function getAreaGraphOptions() {
    const res = graphData
      ? {
          ...areaGraphOptions,
          xaxis: { ...areaGraphOptions?.xaxis, categories: graphData?.lastFiveMonths },
          yaxis: {
            ...areaGraphOptions?.yaxis,
            min: +graphData.minxPurchasePoint,
            max: +graphData.maxPurchasePoint
          }
        }
      : {};
    return res;
  }
  function getAreaGraphDataPoints() {
    return graphData ? [{ ...areaGraphDataPoints[0], data: graphData?.allPoints }] : [];
  }
  return (
    <>
      <Container style={{ background: '#EBEEF0', margin: '20px' }}>
        <Row>
          <Col lg="2">
            <DateSelector size="small" customLabel="From"></DateSelector>
          </Col>
          <Col lg="2">
            <DateSelector size="small" customLabel="To"></DateSelector>
          </Col>
        </Row>
        <Row>
          <Col lg="5">
            <div style={{ marginTop: '20px' }}>
              <label style={fontHeader}>Purchase</label>
            </div>
            <Row style={leftRowStyle}>
              <Col lg="2">
                <Image style={{ height: '50px', width: '50px' }} src={bagIcon} />
              </Col>
              <Col>
                <label style={fontHeader}>Bags Purchased</label>
                <p style={fontValue}>{brokerGraphReports?.total_bags}</p>
              </Col>
            </Row>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Average commission</label>
                <p style={fontValue}>{brokerGraphReports?.avg_commission}%</p>
              </Col>
              <Col style={{ ...leftRowStyle, marginLeft: '15px' }}>
                <label style={fontHeader}>Avg. Bag Rate</label>
                <p style={fontValue}>{brokerGraphReports?.avg_bag_rate}</p>
              </Col>
            </Row>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Avg AP</label>
                <p style={fontValue}>{brokerGraphReports?.avg_ap}</p>
              </Col>
              <Col></Col>
            </Row>
            <div style={{ marginTop: '20px' }}>
              <label style={{ ...fontHeader, marginTop: '15px' }}>Production</label>
            </div>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Outstandings</label>
                <p style={fontValue}>{brokerGraphReports?.outstandings}</p>
              </Col>
              <Col style={{ ...leftRowStyle, marginLeft: '15px' }}>
                <label style={fontHeader}>Unpaid Purchases</label>
                <p style={fontValue}>{brokerGraphReports?.unpaid_purchases}</p>
              </Col>
            </Row>
          </Col>
          <Col
            lg="6"
            style={{
              marginLeft: '30px',
              backgroundColor: 'white',
              marginTop: '60px',
              borderRadius: '15px'
            }}>
            <Row
              style={{
                margin: '30px'
              }}>
              <FormControl variant="standard" size="small" style={{ width: '50%' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value="Total Commissions">
                  <MenuItem value="Total Commissions">Total Commissions</MenuItem>
                  <MenuItem value="Total purchases">Total purchases</MenuItem>
                  <MenuItem value="Broker-wise purchases">Broker-wise purchases</MenuItem>
                </Select>
              </FormControl>
            </Row>
            {/* <Chart options={donutGraphOptions} type="donut" series={donutGraphDataPoints} /> */}
            {graphData && (
              <Chart
                options={getAreaGraphOptions()}
                type="area"
                series={getAreaGraphDataPoints()}
                height="300"
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Reports;
