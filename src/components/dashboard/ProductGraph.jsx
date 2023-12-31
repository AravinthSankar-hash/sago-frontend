import { Col, Row } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
// Graph Spec
import {
  areaGraphOptions,
  areaGraphDataPoints,
  lineGraphDataPoints,
  lineGraphOptions,
  barGraphOptions,
  barGraphDataPoints,
  donutGraphOptions,
  donutGraphDataPoints
} from './graph-spec.js';

function ProductGraph() {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '15px' };
  const fontValue = { font: 'Roboto', fontSize: '13px' };
  const productTitle = { fontSize: '18px', color: '#62728D', marginTop: '8px' };
  const productStatsBorder = {
    border: '2px solid #EBEEF0',
    margin: '12px',
    marginTop: '18px',
    borderRadius: '8px'
  };
  const boldNumbers = { fontSize: '20px' };
  const BorderLinearProgress1 = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[300]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 14,
      backgroundColor: '#F94144'
    }
  }));
  const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[300]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 4,
      backgroundColor: 'orange'
    }
  }));
  return (
    <>
      {/* Stats Row */}
      <Row>
        <Col lg="2" style={productStatsBorder}>
          <label style={productTitle}>Sago</label>
          <Row className="mt-4">
            <label style={fontHeader}>Production</label>
            <span style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </span>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Total Sales</label>
            <p style={fontValue}>
              <text style={boldNumbers}>41,241</text>
              Rupees
            </p>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Available Stock</label>
            <p style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </p>
          </Row>
        </Col>
        <Col lg="2" style={productStatsBorder}>
          <label style={productTitle}>Dry Tippi</label>
          <Row className="mt-4">
            <label style={fontHeader}>Production</label>
            <span style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </span>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Total Sales</label>
            <p style={fontValue}>
              <text style={boldNumbers}>41,241</text> Rupees
            </p>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Available Stock</label>
            <p style={fontValue}>
              <text style={boldNumbers}>500</text> Bags Bags
            </p>
          </Row>
        </Col>
        <Col lg="2" style={productStatsBorder}>
          <label style={productTitle}>Wet Tippi</label>
          <Row className="mt-4">
            <label style={fontHeader}>Production</label>
            <span style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </span>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Total Sales</label>
            <p style={fontValue}>
              <text style={boldNumbers}>41,241</text> Rupees
            </p>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Available Stock</label>
            <p style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </p>
          </Row>
        </Col>
        <Col lg="2" style={productStatsBorder}>
          <label style={productTitle}>Starch</label>
          <Row className="mt-4">
            <label style={fontHeader}>Production</label>
            <span style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </span>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Total Sales</label>
            <p style={fontValue}>
              <text style={boldNumbers}>41,241</text> Rupees
            </p>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Available Stock</label>
            <p style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </p>
          </Row>
        </Col>
        <Col lg="2" style={productStatsBorder}>
          <label style={productTitle}>Broken</label>
          <Row className="mt-4">
            <label style={fontHeader}>Production</label>
            <span style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </span>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Total Sales</label>
            <p style={fontValue}>
              <text style={boldNumbers}>41,241</text> Rupees
            </p>
          </Row>
          <Row className="mt-4">
            <label style={fontHeader}>Available Stock</label>
            <p style={fontValue}>
              <text style={boldNumbers}>500</text> Bags
            </p>
          </Row>
        </Col>
      </Row>
      {/* Graph 1 */}
      <Row>
        <Col lg="10">
          <Chart options={areaGraphOptions} type="area" series={areaGraphDataPoints} height="300" />
        </Col>
      </Row>
      {/* Graph 2 */}
      <Row>
        <Col lg="5">
          <Chart options={lineGraphOptions} type="line" series={lineGraphDataPoints} />
        </Col>
        <Col lg="5">
          <Chart options={barGraphOptions} type="bar" series={barGraphDataPoints} />
        </Col>
      </Row>
      <Row>
        <Col lg="5">
          <Chart options={donutGraphOptions} type="donut" series={donutGraphDataPoints} />
        </Col>
        <Col lg="5">
          <Row className="mt-5">
            <label>Sales</label>
            <BorderLinearProgress1 className="mt-2" variant="determinate" value={80} />
          </Row>
          <Row className="mt-5">
            <label>Purchases</label>
            <BorderLinearProgress2 className="mt-2" variant="determinate" value={50} />
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
}

export default ProductGraph;
