import { Col, Row, Container } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import {
  areaGraphOptions,
  areaGraphDataPoints,
  lineGraphDataPoints,
  lineGraphOptions,
  barGraphOptions,
  barGraphDataPoints,
  donutGraphOptions,
  donutGraphDataPoints,
  totalOrdersLineOptions,
  totalOrdersLinePoints
} from './graph-spec.js';
import { useState } from 'react';

function ProductGraph(props) {
  const { salePurchaseStats, graph1Stats, graph2Stats, graph3Stats, graph4Stats, graph5Stats } =
    props.statisticsData;
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '15px' };
  const fontValue = { font: 'Roboto', fontSize: '13px' };
  const productTitle = { fontSize: '18px', color: '#62728D', marginTop: '8px' };
  const graphBorders = { border: '3px solid #EBEEF0', borderRadius: '15px', marginBottom: '15px' };
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

  const ProductStats = ({ product, onProductClick }) => {
    return (
      <Col lg="2" style={productStatsBorder} onClick={() => onProductClick(product.productName)}>
        <label style={productTitle}>{product.productName}</label>
        <Row className="mt-4">
          <label style={fontHeader}>Production</label>
          <span style={fontValue}>
            <text style={boldNumbers}>{product.totalBagsProduced}</text> Bags
          </span>
        </Row>
        <Row className="mt-4">
          <label style={fontHeader}>Total Sales</label>
          <p style={fontValue}>
            <text style={boldNumbers}>{product.totalBagsSold}</text> Rupees
          </p>
        </Row>
        <Row className="mt-4">
          <label style={fontHeader}>Available Stock</label>
          <p style={fontValue}>
            <text style={boldNumbers}>{product.availableStock}</text> Bags
          </p>
        </Row>
      </Col>
    );
  };
  function handleProductClick(productName) {
    console.log(`Product ${productName} clicked!`);
    setCurrentSelectedProduct(productName);
  }

  const [currentSelectedProduct, setCurrentSelectedProduct] = useState('sago');

  // Graph 1
  function getAreaGraphOptions() {
    const graph1Optinons = graph1Stats.find(
      (product) => product.product_name === currentSelectedProduct
    );
    return graph1Optinons
      ? {
          ...areaGraphOptions,
          xaxis: { ...areaGraphOptions?.xaxis, categories: graph1Optinons?.lastWeekDates },
          yaxis: {
            ...areaGraphOptions?.yaxis,
            min: graph1Optinons.yaxisMin - 2 * graph1Optinons.yaxisMin,
            max: graph1Optinons.yaxisMax + 2 * graph1Optinons.yaxisMax
          }
        }
      : {};
  }
  function getAreaGraphDataPoints() {
    const graph1Optinons = graph1Stats.find(
      (product) => product?.product_name === currentSelectedProduct
    );
    return graph1Optinons ? [{ ...areaGraphDataPoints[0], data: graph1Optinons?.graphData }] : [];
  }
  // Graph 2
  function getLineGraphOptions() {
    return graph2Stats
      ? {
          ...lineGraphOptions,
          xaxis: { ...lineGraphOptions?.xaxis, categories: graph2Stats?.lastSixMonths },
          yaxis: {
            ...lineGraphOptions?.yaxis,
            min: graph2Stats.minYaxis - 2 * graph2Stats.minYaxis,
            max: graph2Stats.maxYaxis + 2 * graph2Stats.maxYaxis
          }
        }
      : {};
  }
  function getLineGraphDataPoints() {
    return graph2Stats
      ? [
          { ...lineGraphDataPoints[0], data: graph2Stats?.topRates },
          { ...lineGraphDataPoints[1], data: graph2Stats?.saleRates }
        ]
      : [];
  }

  // Graph 3
  function getBarGraphDataPoints() {
    return graph3Stats
      ? [
          { ...barGraphDataPoints[0], data: [graph3Stats?.totalTopRate] },
          { ...barGraphDataPoints[1], data: [graph3Stats?.totalSaleRate] }
        ]
      : [];
  }

  // Donut Graph
  function getDonutGraphOptions() {
    return graph4Stats
      ? {
          ...donutGraphOptions,
          labels: graph4Stats?.labels
        }
      : {};
  }
  function getDonutGraphDataPoints() {
    return graph4Stats ? graph4Stats?.ratePoints : [];
  }

  // Total Orders progress chart
  function getTotalOrdersLineOptions() {
    return graph5Stats
      ? {
          ...totalOrdersLineOptions,
          yaxis: {
            ...totalOrdersLineOptions?.yaxis,
            max: graph5Stats?.[0].count + graph5Stats?.[1].count + 5
          },
          subtitle: {
            ...totalOrdersLineOptions?.subtitle,
            text: graph5Stats?.[0].count + graph5Stats?.[1].count
          }
        }
      : {};
  }

  function getTotalOrdersLinePoints() {
    return graph5Stats
      ? [{ ...totalOrdersLinePoints[0], data: [graph5Stats?.[0].count + graph5Stats?.[1].count] }]
      : [];
  }

  function getCompletedOrdersLineOptions() {
    return graph5Stats
      ? {
          ...totalOrdersLineOptions,
          yaxis: {
            ...totalOrdersLineOptions?.yaxis,
            max: graph5Stats?.[0].count + graph5Stats?.[1].count + 5
          },
          title: {
            ...totalOrdersLineOptions?.title,
            text: 'Completed Orders'
          },
          subtitle: {
            ...totalOrdersLineOptions?.subtitle,
            text: graph5Stats?.[0].count
          }
        }
      : {};
  }

  function getCompletedOrdersLinePoints() {
    return graph5Stats ? [{ ...totalOrdersLinePoints[0], data: [graph5Stats?.[0].count] }] : [];
  }

  function getIncompletedOrdersLineOptions() {
    return graph5Stats
      ? {
          ...totalOrdersLineOptions,
          yaxis: {
            ...totalOrdersLineOptions?.yaxis,
            max: graph5Stats?.[0].count + graph5Stats?.[1].count + 5
          },
          title: {
            ...totalOrdersLineOptions?.title,
            text: 'Incompleted Orders'
          },
          subtitle: {
            ...totalOrdersLineOptions?.subtitle,
            text: graph5Stats?.[1].count
          }
        }
      : {};
  }

  function getIncompleteTotalOrdersLinePoints() {
    return graph5Stats ? [{ ...totalOrdersLinePoints[0], data: [graph5Stats?.[1].count] }] : [];
  }
  return (
    <Container>
      {/* Stats Row */}
      <Row>
        <>
          {salePurchaseStats?.map((product, index) => (
            <ProductStats key={index} product={product} onProductClick={handleProductClick} />
          ))}
        </>
      </Row>
      {/* Graph 1 */}
      <Row>
        <Col lg="10">
          <Chart
            options={getAreaGraphOptions()}
            type="area"
            series={getAreaGraphDataPoints()}
            height="300"
          />
        </Col>
      </Row>
      {/* Graph 2 */}
      <Row>
        <Col lg="5" style={graphBorders}>
          <Chart options={getLineGraphOptions()} type="line" series={getLineGraphDataPoints()} />
        </Col>
        <Col lg="1"></Col>
        <Col lg="5" style={graphBorders}>
          <Chart options={barGraphOptions} type="bar" series={getBarGraphDataPoints()} />
        </Col>
      </Row>
      <Row>
        <Col lg="5" style={graphBorders}>
          <Chart options={getDonutGraphOptions()} type="donut" series={getDonutGraphDataPoints()} />
        </Col>
        <Col lg="1"></Col>
        <Col lg="5" style={graphBorders}>
          <Chart
            options={getTotalOrdersLineOptions()}
            series={getTotalOrdersLinePoints()}
            type="bar"
            height={70}
          />
          <Chart
            options={getCompletedOrdersLineOptions()}
            series={getCompletedOrdersLinePoints()}
            type="bar"
            height={70}
          />
          <Chart
            options={getIncompletedOrdersLineOptions()}
            series={getIncompleteTotalOrdersLinePoints()}
            type="bar"
            height={70}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductGraph;
