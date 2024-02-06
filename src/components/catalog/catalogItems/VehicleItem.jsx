import { Row, Col, Container } from 'react-bootstrap';
import React from 'react';
import dp_icon from '../../../assets/images/penguin.jpeg';

function VehicleItem({ vehicleDetails }) {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ padding: '20px' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '7px' }}>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Owner Name</label>
                <p style={fontValue}>{vehicleDetails.owner_name}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Phone No.</label>
                <p style={fontValue}>{vehicleDetails.phone}</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Ownership Type</label>
          <p style={fontValue}>{vehicleDetails.ownership_type}</p>
        </Row>
        <Row>
          <label style={fontHeader}>Address</label>
          <p style={fontValue}>{vehicleDetails.address} </p>
        </Row>

        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Vehicle No.</label>
                <p style={fontValue}>{vehicleDetails.vehicle_no}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Vehicle Type</label>
                <p style={fontValue}>{vehicleDetails.vehicle_type}</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Description</label>
          <p style={fontValue}>{vehicleDetails.description} </p>
        </Row>
      </div>
    </Container>
  );
}

export default VehicleItem;
