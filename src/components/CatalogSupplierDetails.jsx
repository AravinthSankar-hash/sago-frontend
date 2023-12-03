import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import '../css/catalogNewCust.css';

const CatalogSupplierDetails = (props) => {
  const boxWrapper = {
    boxShadow: '#EBEEF0 0px 0px 0px 3px'
  };
  const containerWrapper = {
    font: 'Roboto',
    fontSize: '14px'
  };
  const paraFontStyle = {
    color: '#62728D'
  };
  const scrollStyle = {
    overflowY: 'auto',
    maxHeight: '750px',
    paddingRight: '20px'
  };
  return (
    <Container className="p-4 pt-2 bg-white h-100" style={containerWrapper}>
      <div className="d-flex justify-content-between">
        <div style={{ fontSize: '18px' }}>Supplier Details</div>
        <div>
          <MoreVertOutlinedIcon
            fontSize="small"
            style={{ cursor: 'pointer', color: '#B2B3B7' }}
            onClick={() => props.closeDetails(false)}
          />
        </div>
      </div>
      <div style={scrollStyle}>
        <Row className="p-4 m-2 mt-4" style={boxWrapper}>
          <Col className="g-2">
            <p className="p-0 m-0 text-center" style={paraFontStyle}>
              Outstandings
            </p>
            <p className="p-0 m-0 text-center" style={{ color: '#DE350B' }}>
              ₹ 10,000
            </p>{' '}
          </Col>
          {/* <div style={{ borderRight: '5px solid #EBEEF0', margin: '3%' }}></div> */}
          {/* <div style={{ borderRight: '1px solid #EBEEF0' }}></div> */}
          <Col className="g-2">
            <p className="p-0 m-0 text-center" style={paraFontStyle}>
              {' '}
              Total Paid
            </p>
            <p className="p-0 m-0 text-center" style={{ color: '#00875A' }}>
              ₹ 1,00,000
            </p>
          </Col>
        </Row>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            Supplier Name
          </p>
          <span className="m-0 w-400">Suguna Chickens</span>
        </div>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            Supplier type
          </p>
          <span className="m-0 w-400">Feed</span>
        </div>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            E-mail
          </p>
          <span className="m-0 w-400">sugunachickens@gmail.com</span>
        </div>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            Address
          </p>
          <span className="m-0 w-400">22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</span>
        </div>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            Phone No.
          </p>
          <span className="m-0 w-400">1457896478 / 1236574852</span>
        </div>
        <hr style={{ color: '#62728D' }}></hr>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            GST no.
          </p>
          <span className="m-0 w-400">54165416HBJU</span>
        </div>
        <div className="m-2 mt-4">
          <p className="m-0" style={paraFontStyle}>
            PAN No.
          </p>
          <span className="m-0 w-400">54165416HBJU</span>
        </div>
        <hr style={{ color: '#62728D' }}></hr>
      </div>
    </Container>
  );
};

export default CatalogSupplierDetails;
