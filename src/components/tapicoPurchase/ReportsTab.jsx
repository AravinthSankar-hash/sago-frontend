import { Container } from '@mui/material';
import DateSelector from 'components/helper/DateSelector';
import bagIcon from '../../assets/images/tp_reports_bag.svg';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chart from 'react-apexcharts';
import Select from '@mui/material/Select';
import { Col, Row, Image } from 'react-bootstrap';
import { donutGraphOptions, donutGraphDataPoints } from '../dashboard/graph-spec.js';
import '../../css/index.css';

function Reports() {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '14px' };
  const fontValue = { font: 'Roboto', fontSize: '14px' };
  const leftRowStyle = {
    backgroundColor: 'white',
    padding: '15px',
    marginTop: '15px',
    borderRadius: '15px'
  };
  return (
    <>
      <Container
        style={{ background: '#EBEEF0', margin: '20px', marginLeft: '0px', marginRight: '0px' }}>
        <Row>
          <Col lg="4">
            <Row>
              <Col>
                <DateSelector customLabel="From"></DateSelector>
              </Col>
              <Col>
                <DateSelector customLabel="To"></DateSelector>
              </Col>
            </Row>
            <div style={{ marginTop: '20px' }}>
              <label style={fontHeader}>Purchase</label>
            </div>
            <Row style={leftRowStyle}>
              <Col lg="2">
                <Image style={{ height: '50px', width: '50px' }} src={bagIcon} />
              </Col>
              <Col>
                <label style={fontHeader}>Broker Name</label>
                <p style={fontValue}>Aravinth Sankar</p>
              </Col>
            </Row>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Average commission</label>
                <p style={fontValue}>55%</p>
              </Col>
              <Col style={{ ...leftRowStyle, marginLeft: '15px' }}>
                <label style={fontHeader}>Bag Rate</label>
                <p style={fontValue}>20,00</p>
              </Col>
            </Row>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Avg AP</label>
                <p style={fontValue}>100</p>
              </Col>
              <Col></Col>
            </Row>
            <div style={{ marginTop: '20px' }}>
              <label style={{ ...fontHeader, marginTop: '15px' }}>Production</label>
            </div>
            <Row>
              <Col style={leftRowStyle}>
                <label style={fontHeader}>Outstandings</label>
                <p style={fontValue}>100</p>
              </Col>
              <Col style={{ ...leftRowStyle, marginLeft: '15px' }}>
                <label style={fontHeader}>Unpaid Purchases</label>
                <p style={fontValue}>42</p>
              </Col>
            </Row>
          </Col>
          <Col
            lg="7"
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
                  value="Broker-wise purchases">
                  <MenuItem value="Total Commissions">Total Commissions</MenuItem>
                  <MenuItem value="Total purchases">Total purchases</MenuItem>
                  <MenuItem value="Broker-wise purchases">Broker-wise purchases</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Chart options={donutGraphOptions} type="donut" series={donutGraphDataPoints} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Reports;
