import { Container, Row, Col, Form } from 'react-bootstrap';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TPPaymentsTab from './TPPaymentsTab.jsx';
import TPPurchases from './TPPurchases.jsx';
import TPPayments from './TPPayments.jsx';

function TPDetails() {
  const [tableData, setTableData] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/proPurchase')
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTableHeading(Object.keys(response.data[0]));
        setTableData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const containerRef = useRef();
  const gridStyle = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '350px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto',
      paddingRight: '0px',
      paddingLeft: '0px'
    }),
    []
  );

  const tableContainer = useMemo(
    () => ({
      width: '100%',
      borderRadius: '10px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto',
      padding: '0'
    }),
    []
  );

  const detailsSection = {
    backgroundColor: 'white',
    borderRadius: '10px',
    paddingBottom: '30px',
    margin: '3px',
    marginBottom: '20px'
  };
  const summaztionFooterRows = {
    padding: '10px',
    color: '#62728D'
  };
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '13px', paddingBottom: '5px' };
  const fontValue = { font: 'Roboto', fontSize: '12px', color: 'black' };
  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <div style={{ detailsSection }}>
          <Row style={{ padding: '15px', paddingBottom: '0px' }}>
            <Col>
              <div>
                <div style={fontHeader}>Purchase No.</div>
                <p style={{ fontValue }}>TP123</p>
              </div>
            </Col>
            <Col>
              <div>
                <div style={fontHeader}>Purchase Date.</div>
                <p style={fontValue}>12 Nov 2021</p>
              </div>
            </Col>
            <Col>
              <div>
                <div style={fontHeader}>Payment Due Date</div>
                <p style={fontValue}>26 Oct 2022</p>
              </div>
            </Col>
            <Col>
              <div>
                <div style={fontHeader}>Purchase Status</div>
                <p style={fontValue}>Paid</p>
              </div>
            </Col>
            <Col>
              <AttachFileOutlinedIcon
                fontSize={'small'}
                style={{ ...fontHeader, fontSize: '20px' }}
              />
              <text style={{ font: 'Roboto', color: '#62728D', fontSize: '16px' }}>
                Attachments(0)
              </text>
            </Col>
            <Col>
              <IosShareOutlinedIcon
                fontSize={'small'}
                style={{ ...fontHeader, fontSize: '20px' }}
              />
              <text style={{ font: 'Roboto', color: '#62728D', fontSize: '16px' }}>
                {' '}
                Export PDF{' '}
              </text>
            </Col>
            <Col>
              <LocalPrintshopOutlinedIcon
                fontSize={'small'}
                style={{ ...fontHeader, fontSize: '20px' }}
              />{' '}
              <text style={{ font: 'Roboto', color: '#62728D', fontSize: '16px' }}> Print </text>
            </Col>
            <hr style={{ borderTopWidth: '0.75px', marginLeft: '10px' }} />
          </Row>

          <Row style={{ padding: '15px', paddingBottom: '0px' }}>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control disabled />
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Commission %</Form.Label>
              <Form.Control disabled />
            </Form.Group>
          </Row>

          <Row style={{ padding: '15px', paddingBottom: '0px' }}>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Address</Form.Label>
              <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
            </Form.Group>
            <Form.Group as={Col} xs={3}>
              <Form.Label>Phone No.</Form.Label>
              <p>1234567890</p>
            </Form.Group>
          </Row>

          <Row style={{ padding: '15px', paddingBottom: '0px' }}>
            <Col xs={6}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Vehicle No.</Form.Label>
                    <Form.Control disabled />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Weight Bill No.</Form.Label>
                    <Form.Control disabled />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col xs={3} style={{ marginLeft: 'auto' }}>
              <table>
                <tbody style={{ textAlign: 'left' }}>
                  <tr>
                    <td style={summaztionFooterRows}>Total Bill Amount</td>
                    <td style={summaztionFooterRows}>:</td>
                    <td>₹ 10,000</td>
                  </tr>
                  <tr>
                    <td style={summaztionFooterRows}>Total Bill</td>
                    <td style={summaztionFooterRows}>:</td>
                    <td>₹ 8,944</td>
                  </tr>
                  <tr style={{ borderTop: '0.5px solid #62728D' }}>
                    <td style={summaztionFooterRows}>Outstandings</td>
                    <td style={summaztionFooterRows}>:</td>
                    <td>₹ 18,944</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>
      </Container>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={tableContainer}>
        <div style={{ detailsSection }}>
          <TPPaymentsTab></TPPaymentsTab>
          {/* <TPPurchases tableHeading={tableHeading} tableData={tableData}></TPPurchases> */}
          <div style={gridStyle}>
            <TPPayments></TPPayments>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TPDetails;
