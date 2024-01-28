import { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import '../../../css/catalogNewCust.css';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TabComponent from '../../helper/TabComponent';
import GsSales from './GsSales';
import GsPayment from './GsPayment';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GenericService from '../../../services/generic.api';

const GsDetails = ({ selectedRowData, onDeleteListApi }) => {
  const [itemTableData, setItemTableData] = useState([]);
  const [footerValues, setFooterValues] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [paymentFooterValues, setPaymentFooterValues] = useState([]);
  const [paymentTableData, setPaymentTableData] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  const [showPurchase, setShowPurchase] = useState(true);

  const itemTableHeaders = [
    'Item Details',
    'HSN/SAC',
    'Bag Weight(Kgs)',
    'Quantity',
    'Total Weight(Kgs)',
    'Kg/Rate',
    'Rate',
    'Total Rate'
  ];
  const paymentTableHeaders = ['Date', 'Amount'];

  useEffect(() => {
    setItemTableData(selectedRowData?.items);
    setFooterValues({
      total_rate: selectedRowData.total_rate_sum,
      tax: selectedRowData.tax_value,
      sgst: selectedRowData.sgst_value,
      cgst: selectedRowData.cgst_value,
      grand_total: selectedRowData.grand_total
    });
    setPaymentTableData(selectedRowData.payments);
    setPaymentFooterValues({ amount_paid: selectedRowData.paid_amount });
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

  const deleteInvoice = (itemId) => {
    invokeDeleteApi(`type=sale&ref_id=${itemId}`);
  };
  const invokeDeleteApi = (query = null) => {
    GenericService.deleteInvoice(query)
      .then((response) => {
        onDeleteListApi(false);
      })
      .catch((error) => {
        console.log('Error in searching Purchase data', error);
        // invokeToaster(RESPONSE_MSG.INVALID_SEARCH_TEXT, 'red');
      });
  };

  return (
    <>
      <Container ref={containerRef} className="ag-theme-alpine mt-4" style={gridStyle}>
        <div
          className="m-3 d-flex justify-content-between align-items-center"
          style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="d-flex w-100 ">
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Invoice No.
              </p>
              <p style={{ fontSize: '12px' }}>{selectedRowData?.['invoice_number']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Sales Date
              </p>
              <p style={{ fontSize: '12px' }}>{selectedRowData?.['sale_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Payment due date :
              </p>
              <p style={{ fontSize: '12px' }}>{selectedRowData?.['payment_due_date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Invoice Status :
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
                <p style={{ fontSize: '12px' }}>{selectedRowData?.['payment_status']}</p>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between w-25">
            <div className="m-2 d-flex" style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <IosShareOutlinedIcon fontSize={'small'} /> Export PDF{' '}
            </div>
            <div className="m-2" style={{ color: '#62728D', marginRight: '50px' }}>
              {' '}
              <LocalPrintshopOutlinedIcon fontSize={'small'} /> Print{' '}
            </div>
            <div className="m-2 d-flex" style={{ color: '#B2B3B7', marginLeft: '10px' }}>
              {/* <MoreVertOutlinedIcon /> */}
              <DeleteOutlineOutlinedIcon
                style={{ color: '#BF2600  ' }}
                onClick={() => deleteInvoice(selectedRowData?.item_id)}
              />
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedRowData?.['customer_name']}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>GSTIN</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedRowData?.['gst_in']}
                disabled
              />
            </Form.Group>
          </div>
          <div className="m-3 d-flex">
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Address
              </p>
              <p style={{ fontSize: '12px' }}>{selectedRowData?.['address']}</p>
            </div>
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Phone No.
              </p>
              <p style={{ fontSize: '12px' }}>{selectedRowData?.['phone']}</p>
            </div>
          </div>
        </div>
        <div className="m-3 d-flex" style={{ borderBottom: '1px solid #EBEEF0' }}>
          <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
            <Form.Label>Distance</Form.Label>
            <Form.Control
              style={disabledInput}
              defaultValue={selectedRowData?.['distance']}
              disabled
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Place of Supply</Form.Label>
            <Form.Control
              style={disabledInput}
              defaultValue={selectedRowData?.['supply_location']}
              disabled
            />
          </Form.Group>
        </div>
        <div className="m-3 d-flex" style={{ borderBottom: '1px solid #EBEEF0' }}>
          <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
            <Form.Label>Vehicle No.</Form.Label>
            <Form.Control
              style={disabledInput}
              defaultValue={selectedRowData?.['vehicle_no']}
              disabled
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Driver Name</Form.Label>
            <Form.Control
              style={disabledInput}
              defaultValue={selectedRowData?.['driver_name']}
              disabled
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Driver Phone No.</Form.Label>
            <Form.Control
              style={disabledInput}
              defaultValue={selectedRowData?.['driver_phone']}
              disabled
            />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
              <Form.Label>E-WaY bILL nO.</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={selectedRowData?.['eway_bill']}
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
                  <td>₹ {selectedRowData?.['grand_total']}</td>
                </tr>
                <tr>
                  <td style={tableRow}>Total Paid:</td>
                  <td style={{ color: '#00875A' }}>₹ {selectedRowData?.['paid_amount']}</td>
                </tr>
                <tr style={{ borderBottom: '2px solid #EBEEF0', color: '#EBEEF0' }}></tr>
                <tr>
                  <td style={tableRow}>Outstandings :</td>
                  <td style={{ color: '#DE350B' }}>₹ {selectedRowData?.['outstandings']}/-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* </Form> */}
      </Container>

      {itemTableData?.length ? (
        <Container ref={containerRef} className="ag-theme-alpine mt-4" style={tableContainer}>
          <TabComponent
            showTab={showTab}
            paymentCategory="general"
            paymentRefId={selectedRowData.item_id}
            showPurchase={showPurchase}
            tabName={'Sales'}
            partyName={selectedRowData.customer_name}
          />
          <Container style={gridStyle}>
            {showPurchase ? (
              <GsSales
                tableHeading={itemTableHeaders}
                tableData={itemTableData}
                footerValues={footerValues}
              />
            ) : (
              <GsPayment
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

export default GsDetails;
