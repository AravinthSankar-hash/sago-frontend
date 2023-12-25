import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TabComponent from '../TabComponent';
import ExpenseTab from './ExpenseTab';
import ExpensePayment from './ExpensePayment';
// import '../css/index.css';

const ExpenseDetails = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  const [showPurchase, setShowPurchase] = useState(true);

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
      maxHeight: '400px',
      backgroundColor: 'white',
      fontSize: '14px',
      fontFamily: 'Roboto',
      paddingRight: '0'
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

  const showTab = (shouldShow) => {
    // alert(shouldShow);
    setShowPurchase(shouldShow);
  };

  const disabledInput = {
    background: '#F4F5F7',
    color: '#A5ADBA',
    border: 'none'
  };

  const tableRow = {
    padding: '10px',
    textAlign: 'right',
    color: '#5C9EB8'
  };

  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <div
          className="m-3 d-flex justify-content-between"
          style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="p-2">
            <p className="mb-1" style={{ color: '#62728D' }}>
              Expense No.
            </p>
            <p style={{ fontSize: '12px' }}>{props.rowData['Purchase No']}</p>
          </div>
          <div className="p-2">
            <p className="mb-1" style={{ color: '#62728D' }}>
              Expense Date
            </p>
            <p style={{ fontSize: '12px' }}>{props.rowData['Purchase date']}</p>
          </div>
          <div className="p-2">
            <p className="mb-1" style={{ color: '#62728D' }}>
              Expense due date :
            </p>
            <p style={{ fontSize: '12px' }}>26 Oct 2022</p>
          </div>
          <div className="p-2">
            <p className="mb-1" style={{ color: '#62728D' }}>
              Expense Status :
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#BF2600',
                backgroundColor: '#FFEBE6',
                width: 'fit-content',
                fontWeight: 'bold',
                padding: '0 4px'
              }}>
              UNPAID
            </p>
          </div>
          <div className="m-2 d-flex align-items-center" style={{ color: '#62728D' }}>
            {' '}
            <AttachFileOutlinedIcon fontSize={'small'} /> Attachments(0){' '}
          </div>
          <div className="m-2 d-flex align-items-center" style={{ color: '#62728D' }}>
            {' '}
            <IosShareOutlinedIcon fontSize={'small'} /> Export PDF{' '}
          </div>
          <div className="m-2 d-flex align-items-center" style={{ color: '#62728D' }}>
            {' '}
            <LocalPrintshopOutlinedIcon fontSize={'small'} /> Print{' '}
          </div>

          <MoreVertOutlinedIcon
            className="mt-2  d-flex align-items-center"
            style={{ color: '#B2B3B7' }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <div className="m-3 d-flex">
              <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
                <Form.Label>Party Name</Form.Label>
                <Form.Control
                  style={disabledInput}
                  defaultValue={'Party Name'}
                  //   disabled
                />
              </Form.Group>
              <Form.Group as={Col} style={{ marginRight: '20px', width: '100%' }}>
                <Form.Label>Phone no.</Form.Label>
                <Form.Control style={disabledInput} defaultValue="8941555367" disabled />
              </Form.Group>
            </div>
            <div className="m-3 d-flex">
              <div style={{ marginRight: '20px', width: '100%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Address
                </p>
                <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
              </div>
              <div style={{ marginRight: '20px', width: '30%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Phone No.
                </p>
                <p>1234567890</p>
              </div>
              <div style={{ marginRight: '20px', width: '30%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Expense Type
                </p>
                <p>Infrastructure</p>
              </div>
            </div>
          </div>
          <div>
            <table
              className="mt-5"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                paddingRight: '50px'
              }}>
              <tbody className="mb-1">
                <tr>
                  <td style={tableRow}>Total Bill Amount :</td>
                  <td>₹ 10,000.00</td>
                </tr>
                <tr>
                  <td style={tableRow}>Total Paid:</td>
                  <td style={{ color: '#00875A' }}>₹ 2,000.00</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #EBEEF0', color: '#EBEEF0' }}></tr>
                <tr>
                  <td style={tableRow}>Outstandings :</td>
                  <td style={{ color: '#DE350B' }}>₹ 8,000.00/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* </Form> */}
      </Container>

      {tableData.length > 0 && tableHeading.length > 0 ? (
        <Container ref={containerRef} className="ag-theme-alpine mt-5" style={tableContainer}>
          <TabComponent showTab={showTab} showPurchase={showPurchase} tabName={'Expense'} />
          <Container style={gridStyle}>
            {showPurchase ? (
              <ExpenseTab tableHeading={tableHeading} tableData={tableData} />
            ) : (
              <ExpensePayment />
            )}
          </Container>
        </Container>
      ) : (
        ''
      )}
    </>
  );
};

export default ExpenseDetails;
