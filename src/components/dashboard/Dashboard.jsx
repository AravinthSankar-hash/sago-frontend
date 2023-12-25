import { Container, Row, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
function Dashboard() {
  const graph4Series = [
    {
      name: 'Sale Rate', //will be displayed on the y-axis
      data: [30]
    },
    {
      name: 'Sale Rate', //will be displayed on the y-axis
      data: [50]
    }
  ];

  const graph4Options = {
    chart: {
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: [1] //will be displayed on the x-asis
    },
    plotOptions: {
      bar: {
        columnWidth: '10%'
      }
    },
    // Grid lines
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  /*  Graph  */
  const graph1Options = {
    //   Toobar disable for hamburger menu
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: true
        }
      }
    },
    // To fill the graph in color
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    // Data points display
    dataLabels: {
      enabled: false
    },

    // x axia categories and title
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      title: {
        text: 'X axis Name'
      }
    },
    // Graph Header
    title: {
      text: 'Any title'
    },
    // Y axis value start, end, and divident
    yaxis: [
      {
        title: {
          text: 'Y axis name'
        },
        min: 0,
        max: 900,
        tickAmount: 9
      }
    ],
    // Grid lines
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  //   Graph data points
  const graph1series = [
    {
      name: 'No. of bags',
      data: [145, 522, 318, 545, 219, 223, 852]
    }
  ];
  /* ************* */

  /*  Graph 2 */
  const graph2Options = {
    stroke: {
      curve: 'smooth'
    },
    //   Toobar disable for hamburger menu
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: true
        }
      }
    },
    // To fill the graph in color
    colors: ['#90BE6D', '#00B7FF'],
    // Data points display
    dataLabels: {
      enabled: false
    },

    // x axia categories and title
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      title: {
        text: 'X axis Name'
      }
    },
    // Graph Header
    title: {
      text: 'Any title'
    },
    // Y axis value start, end, and divident
    yaxis: [
      {
        title: {
          text: 'Y axis name'
        },
        min: 0,
        max: 900,
        tickAmount: 9
      }
    ],
    // Grid lines
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  //   Graph data points
  const graph2series = [
    {
      name: 'Sale Rate',
      data: [600, 200, 480, 650, 500]
    },
    {
      name: 'Top Rate',
      data: [400, 100, 380, 550, 400]
    }
  ];
  /* ************* */

  /*  Graph 3 */
  const graph3Options = {
    chart: { type: 'donut' },
    width: 2,
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    plotOptions: {
      pie: {
        donut: {
          size: '35%'
        },
        customScale: 0.7
      }
    }
  };
  const graph3Series = [44, 55, 41, 17];

  /* ************* */

  const graph5Options = {
    chart: {
      type: 'bar'
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['South Korea']
    }
  };

  const graph5Series = [
    {
      data: [10, 20]
    }
  ];
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
    <Container>
      <Row>
        <Col>
          <Chart options={graph1Options} type="area" series={graph1series} />
        </Col>
        <Col>
          <Chart options={graph2Options} type="line" series={graph2series} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Chart options={graph3Options} type="donut" series={graph3Series} />
        </Col>
        <Col>
          <Chart options={graph4Options} type="bar" series={graph4Series} />
        </Col>
        {/* <Col>
          <Row>
            <Row>
              <Col lg={11}>Completed Orders</Col>
              <Col>80</Col>
            </Row>

            <BorderLinearProgress1 variant="determinate" value={80} />
          </Row>
          <br></br>
          <Row>
            <Row>
              <Col lg={11}>Incomplete Orders</Col>
              <Col>50</Col>
            </Row>

            <BorderLinearProgress2 variant="determinate" value={50} />
          </Row>
        </Col> */}
      </Row>
    </Container>
  );
}

export default Dashboard;
