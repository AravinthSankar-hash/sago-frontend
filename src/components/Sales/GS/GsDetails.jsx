import { useMemo, useRef, useEffect, useState } from 'react';
import { Container, Form, Col } from 'react-bootstrap';
import '../../../css/catalogNewCust.css';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import TabComponent from '../../helper/TabComponent';
import GsSales from './GsSales';
import GsPayment from './GsPayment';

const GsDetails = (props) => {
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
          className="m-3 d-flex justify-content-between align-items-center"
          style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="d-flex w-100 ">
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Invoice No.
              </p>
              <p style={{ fontSize: '12px' }}>{props.rowData['Purchase No']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Sales Date
              </p>
              <p style={{ fontSize: '12px' }}>{props.rowData['Purchase date']}</p>
            </div>
            <div className="p-2" style={{ marginRight: '30px' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Payment due date :
              </p>
              <p style={{ fontSize: '12px' }}>26 Oct 2022</p>
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
                UNPAID
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
              <MoreVertOutlinedIcon />
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #EBEEF0' }}>
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                style={disabledInput}
                defaultValue={props.rowData['Supplier Name']}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
              <Form.Label>GSTIN</Form.Label>
              <Form.Control style={disabledInput} defaultValue="BAG7869874" disabled />
            </Form.Group>
          </div>
          <div className="m-3 d-flex">
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Address
              </p>
              <p>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
            </div>
            <div style={{ marginRight: '20px', width: '20%' }}>
              <p className="mb-1" style={{ color: '#62728D' }}>
                Phone No.
              </p>
              <p>1234567890</p>
            </div>
          </div>
        </div>
        <div className="m-3 d-flex" style={{ borderBottom: '1px solid #EBEEF0' }}>
          <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
            <Form.Label>Distance</Form.Label>
            <Form.Control style={disabledInput} defaultValue="360 kms" disabled />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Place of Supply</Form.Label>
            <Form.Control style={disabledInput} defaultValue="Chennai" disabled />
          </Form.Group>
        </div>
        <div className="m-3 d-flex" style={{ borderBottom: '1px solid #EBEEF0' }}>
          <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '20%' }}>
            <Form.Label>Vehicle No.</Form.Label>
            <Form.Control style={disabledInput} defaultValue="TV54PD6789" disabled />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Driver Name</Form.Label>
            <Form.Control style={disabledInput} defaultValue="Ramu" disabled />
          </Form.Group>
          <Form.Group
            as={Col}
            xs={3}
            style={{ marginRight: '20px', width: '20%', marginBottom: '26px' }}>
            <Form.Label>Driver Phone No.</Form.Label>
            <Form.Control style={disabledInput} defaultValue="1234567890" disabled />
          </Form.Group>
        </div>
        <div className="d-flex justify-content-between">
          <div className="m-3 d-flex">
            <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
              <Form.Label>E-WaY bILL nO.</Form.Label>
              <Form.Control style={disabledInput} defaultValue="TV54PD6789" disabled />
            </Form.Group>
            {/* <Form.Group as={Col} xs={3} style={{ marginRight: '20px', width: '60%' }}>
              <Form.Label>Place of Supply</Form.Label>
              <Form.Control style={disabledInput} defaultValue="AAA" disabled />
            </Form.Group> */}
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
        <Container ref={containerRef} className="ag-theme-alpine mt-4" style={tableContainer}>
          <TabComponent showTab={showTab} showPurchase={showPurchase} tabName={'Sales'} />
          <Container style={gridStyle}>
            {showPurchase ? (
              <GsSales tableHeading={tableHeading} tableData={tableData} />
            ) : (
              <GsPayment />
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
