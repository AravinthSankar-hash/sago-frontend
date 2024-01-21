import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TabComponent from '../helper/TabComponent';
import ExpenseTab from './ExpenseTab';
import ExpensePayment from './ExpensePayment';
// import '../css/index.css';

const ExpenseDetails = ({ selectedExpense }) => {
  const [tableData, setTableData] = useState([]);
  const [paymentFooterValues, setPaymentFooterValues] = useState([]);
  const [paymentTableData, setPaymentTableData] = useState([]);
  const [showPurchase, setShowPurchase] = useState(true);
  const [footerValues, setFooterValues] = useState([]);
  const tableHeading = ['Expense Description', 'Amount'];

  const paymentTableHeaders = ['Date', 'Amount'];
  useEffect(() => {
    setTableData(selectedExpense.items);
    setPaymentTableData(selectedExpense.payments);
    setPaymentFooterValues({
      purchase_total: selectedExpense.purchase_total,
      payment_status: selectedExpense.payment_status
    });
    setFooterValues({
      sub_total: selectedExpense.sub_total,
      labour_charge: ((3 / 100) * selectedExpense.sub_total).toFixed(2),
      vehicle_rent: 300,
      purchase_total: selectedExpense.purchase_total,
      commission: 76,
      grand_total: selectedExpense.sub_total + (3 / 100) * selectedExpense.sub_total + 300 + 76,
      approval_status: selectedExpense.payment_status
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
          <div className="d-flex w-100 ">
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Expense No.
              </p>
              <p style={{ fontSize: '12px' }}>{selectedExpense['invoice_number']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Expense Date
              </p>
              <p style={{ fontSize: '12px' }}>{selectedExpense['expense_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Expense due date :
              </p>
              <p style={{ fontSize: '12px' }}>{selectedExpense['payment_due_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
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
                {selectedExpense['payment_status']}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between w-50">
            <div
              className="m-2 d-flex align-items-center"
              style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <AttachFileOutlinedIcon fontSize={'small'} /> Attachments(0){' '}
            </div>
            <div
              className="m-2 d-flex align-items-center"
              style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <IosShareOutlinedIcon fontSize={'small'} /> Export PDF{' '}
            </div>
            <div
              className="m-2 d-flex align-items-center"
              style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <LocalPrintshopOutlinedIcon fontSize={'small'} /> Print{' '}
            </div>
            <div
              className="m-2 d-flex align-items-center"
              style={{ color: '#B2B3B7', marginLeft: '10px' }}>
              <MoreVertOutlinedIcon />
            </div>{' '}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <div className="m-3 d-flex">
              <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
                <Form.Label>Party Name</Form.Label>
                <Form.Control
                  style={disabledInput}
                  defaultValue={selectedExpense['party_name']}
                  //   disabled
                />
              </Form.Group>
              <Form.Group as={Col} style={{ marginRight: '20px', width: '100%' }}>
                <Form.Label>Phone no.</Form.Label>
                <Form.Control
                  style={disabledInput}
                  defaultValue={selectedExpense['phone']}
                  disabled
                />
              </Form.Group>
            </div>
            <div className="m-3 d-flex">
              <div style={{ marginRight: '10px', width: '100%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Address
                </p>
                <p>Sivakasi</p>
                {/* <p>{selectedExpense['address']}</p> */}
              </div>
              <div style={{ marginRight: '20px', width: '100%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Phone No.
                </p>
                <p>9876543567</p>
                {/* <p>{selectedExpense['phone']}</p> */}
              </div>
              <div style={{ marginRight: '10px', width: '100%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Expense Type
                </p>
                <p>{selectedExpense['expense_type']}</p>
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
                  <td>₹ {selectedExpense['purchase_total']}</td>
                </tr>
                <tr>
                  <td style={tableRow}>Total Paid:</td>
                  <td style={{ color: '#00875A' }}>₹ {selectedExpense['paid_amount']}</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #EBEEF0', color: '#EBEEF0' }}></tr>
                <tr>
                  <td style={tableRow}>Outstandings :</td>
                  <td style={{ color: '#DE350B' }}>₹ {selectedExpense['outstandings']}/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* </Form> */}
      </Container>

      {tableData.length > 0 && tableHeading.length > 0 ? (
        <Container ref={containerRef} className="ag-theme-alpine mt-5" style={tableContainer}>
          <TabComponent
            showTab={showTab}
            showPurchase={showPurchase}
            tabName={'Expense'}
            paymentCategory="expense"
            paymentRefId={selectedExpense.item_id}
          />
          <Container style={gridStyle}>
            {showPurchase ? (
              <ExpenseTab
                tableHeading={tableHeading}
                tableData={tableData}
                footerValues={footerValues}
              />
            ) : (
              <ExpensePayment
                tableHeaders={paymentTableHeaders}
                tableData={paymentTableData}
                footerValues={paymentFooterValues}
              />
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
