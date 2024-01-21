import { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import '../../css/catalogNewCust.css';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TabComponent from '../helper/TabComponent';
import ProcurementPurchase from './ProcurementPurchase';
import ProcurementPayment from './ProcurementPayment';
// import '../css/index.css';

const ProcurementDetails = ({ selectedPro }) => {
  // const { selectedPro } = props;
  const [tableData, setTableData] = useState([]);
  const [paymentFooterValues, setPaymentFooterValues] = useState([]);
  const [paymentTableData, setPaymentTableData] = useState([]);
  const [showPurchase, setShowPurchase] = useState(true);
  const [footerValues, setFooterValues] = useState([]);
  const tableHeading = ['Product Details', 'Product Type', 'Rate', 'Quantity', 'Units', 'Amount'];

  const paymentTableHeaders = ['Date', 'Amount'];

  useEffect(() => {
    setTableData(selectedPro.product_details);
    setPaymentTableData(selectedPro.payments);
    setPaymentFooterValues({
      purchase_total: selectedPro.purchase_total,
      payment_status: selectedPro.payment_status
    });
    setFooterValues({
      sub_total: selectedPro.sub_total,
      discount: selectedPro.discount,
      tax_rate: selectedPro.tax_rate,
      tax: selectedPro.tax,
      purchase_total: selectedPro.purchase_total,
      approval_status: selectedPro.payment_status
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
                Purchase No.
              </p>
              <p style={{ fontSize: '12px' }}>{selectedPro['invoice_number']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Purchase Date
              </p>
              <p style={{ fontSize: '12px' }}>{selectedPro['purchase_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Payment due date :
              </p>
              <p style={{ fontSize: '12px' }}>{selectedPro['payment_due_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Purchase Status :
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
                {selectedPro['payment_status']}
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
                <Form.Label>Supplier Name</Form.Label>
                <Form.Control
                  style={disabledInput}
                  defaultValue={selectedPro['supplier_name']}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '30%' }}>
                <Form.Label>Phone no.</Form.Label>
                <Form.Control style={disabledInput} defaultValue={selectedPro['phone']} disabled />
              </Form.Group>
            </div>
            <div className="m-3 d-flex">
              <div style={{ marginRight: '20px', width: '60%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Address
                </p>
                {selectedPro['address']}
              </div>
              <div style={{ marginRight: '20px', width: '30%' }}>
                <p className="mb-1" style={{ color: '#62728D' }}>
                  Phone No.
                </p>
                {selectedPro['phone']}
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
                  <td>₹ {selectedPro['purchase_total']}</td>
                </tr>
                <tr>
                  <td style={tableRow}>Total Paid:</td>
                  <td style={{ color: '#00875A' }}>₹ {selectedPro['paid_amount']}</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #EBEEF0', color: '#EBEEF0' }}></tr>
                <tr>
                  <td style={tableRow}>Outstandings :</td>
                  <td style={{ color: '#DE350B' }}>₹ {selectedPro['outstandings']}/-</td>
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
            tabName={'Purchase'}
            paymentCategory="procurement"
            paymentRefId={selectedPro.item_id}
          />
          <Container style={gridStyle}>
            {showPurchase ? (
              <ProcurementPurchase
                tableHeading={tableHeading}
                tableData={tableData}
                footerValues={footerValues}
              />
            ) : (
              <ProcurementPayment
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

export default ProcurementDetails;
