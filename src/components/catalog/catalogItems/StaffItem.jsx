import { Row, Col, Image, Container } from 'react-bootstrap';
import React from 'react';
import dp_icon from '../../../assets/images/penguin.jpeg';

function StaffItem({ staffDetails }) {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ padding: '20px' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '7px' }}>
        <Row>
          <Col style={{ paddingBottom: '20px' }}>
            <Image style={{ height: '100px', width: '100px' }} src={dp_icon} roundedCircle />
          </Col>
        </Row>
        <Row>
          <label style={fontHeader}>Staff Name</label>
          <p style={fontValue}>{staffDetails.name}</p>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Designtion</label>
                <p style={fontValue}>{staffDetails.designation}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Qualification</label>
                <p style={fontValue}>{staffDetails.qualification}</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Email</label>
                <p style={fontValue}>{staffDetails.email}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Phone Number</label>
                <p style={fontValue}>{staffDetails.phone}</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Address</label>
          <p style={fontValue}>{staffDetails.address}</p>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Aadhar No.</label>
                <p style={fontValue}>{staffDetails.aadhar}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>PAN No.</label>
                <p style={fontValue}>{staffDetails.pan}</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Description</label>
          <p style={fontValue}>{staffDetails.description} </p>
        </Row>
      </div>
    </Container>
  );
}

export default StaffItem;
