import { Container, Col, Form } from 'react-bootstrap';
import { useRef, useMemo, useEffect, useState } from 'react';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TPPurchases from './TPPurchases.jsx';
import TPPayments from './TPPayments.jsx';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import TabComponent from 'components/helper/TabComponent.jsx';

function TPDetails(props) {
  const { selectedTP } = props;
  console.log(selectedTP, 'tppp');
  const [tableData, setTableData] = useState([]);
  const [paymentFooterValues, setPaymentFooterValues] = useState([]);
  const [paymentTableData, setPaymentTableData] = useState([]);
  const [showPurchase, setShowPurchase] = useState(true);
  const [footerValues, setFooterValues] = useState([]);

  const paymentTableHeaders = ['Date', 'Amount'];

  useEffect(() => {
    let combinedTableData = [
      { ...selectedTP.weightage_details[0], ...selectedTP.charges_details[0] }
    ];
    setTableData(combinedTableData);
    setPaymentTableData(selectedTP.payments);
    setPaymentFooterValues({ amount_paid: selectedTP.paid_amount });
    setFooterValues({
      total_weight: combinedTableData[0].total_weight,
      vehicle_weight: combinedTableData[0].vehicle_weight,
      net_weight: combinedTableData[0].net_weight,
      sand_weight: combinedTableData[0].sand_weight,
      labour_charges: selectedTP.labour_charges,
      vehicle_rent: selectedTP.vehicle_rent,
      commission: selectedTP.commission,
      grand_total: selectedTP.grand_total
    });
  }, []);

  const tableHeading = ['Tapioca Type', 'AP', 'TP', 'P. Rate', 'Tonnage Rate', 'Bags', 'Amount'];
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
  // const detailsSection = {
  //   backgroundColor: 'white',
  //   borderRadius: '10px',
  //   paddingBottom: '30px',
  //   margin: '3px',
  //   marginBottom: '20px'
  // };
  // const summaztionFooterRows = {
  //   padding: '10px',
  //   color: '#62728D'
  // };
  // const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '13px', paddingBottom: '5px' };
  // const fontValue = { font: 'Roboto', fontSize: '12px', color: 'black' };
  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <div
          className="m-3 d-flex justify-content-between align-items-center"
          style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="d-flex w-100 ">
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Purchase No.
              </p>
              <p style={{ fontSize: '12px' }}>{selectedTP['invoice_number']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Purchase Date
              </p>
              <p style={{ fontSize: '12px' }}>{selectedTP['purchase_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Payment due date :
              </p>
              <p style={{ fontSize: '12px' }}>{selectedTP['payment_due_date']}</p>
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
                {selectedTP['payment_status']}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between w-50">
            <div className="m-2 d-flex align-items-center" style={{ color: '#62728D' }}>
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
              className="m-2 align-items-center"
              style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <LocalPrintshopOutlinedIcon fontSize={'small'} /> Print{' '}
            </div>
            <div
              className="m-2 d-flex align-items-center"
              style={{ color: '#B2B3B7', marginLeft: '10px' }}>
              <MoreVertOutlinedIcon />
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>Broker Name</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedTP['broker_name']}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>Commision %</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedTP['commission']}
                disabled
              />
            </Form.Group>
          </div>
          <div className="m-3 mb-0 d-flex">
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Address
              </p>
              <p>{selectedTP['address']}</p>
            </div>
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Phone No.
              </p>
              <p>{selectedTP['phone']}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
              <Form.Label>Vehicle No.</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedTP['vehicle_no']}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
              <Form.Label>Weight Bill No.</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedTP['weight_bill_no']}
                disabled
              />
            </Form.Group>
          </div>
          <div>
            <table
              className="mt-3"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
                paddingRight: '50px'
              }}>
              <tbody className="mb-1">
                <tr>
                  <td style={tableRow}>Total Bill Amount :</td>
                  <td>{selectedTP['grand_total']}</td>
                </tr>
                <tr>
                  <td style={tableRow}>Total Paid:</td>
                  <td style={{ color: '#00875A' }}>{selectedTP['paid_amount']}</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #EBEEF0', color: '#EBEEF0' }}></tr>
                <tr>
                  <td style={tableRow}>Outstandings :</td>
                  <td style={{ color: '#DE350B' }}>{selectedTP['outstandings']}/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      {tableData.length > 0 && tableHeading.length > 0 ? (
        <Container ref={containerRef} className="ag-theme-alpine mt-3" style={tableContainer}>
          <TabComponent
            showTab={showTab}
            showPurchase={showPurchase}
            tabName={'Purchase'}
            paymentCategory="tp"
            paymentRefId={selectedTP.item_id}
          />
          <Container style={gridStyle}>
            {showPurchase ? (
              <TPPurchases
                tableHeading={tableHeading}
                tableData={tableData}
                footerValues={footerValues}
              />
            ) : (
              <TPPayments
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
}

export default TPDetails;
