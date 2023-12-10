import { Row, Col, Container } from 'react-bootstrap';
import React from 'react';
import dp_icon from '../../assets/images/penguin.jpeg';

function VehicleItem() {
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
                <p style={fontValue}>ABCDEF</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Phone No.</label>
                <p style={fontValue}>21345677892</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Ownership Type</label>
          <p style={fontValue}>Rental</p>
        </Row>
        <Row>
          <label style={fontHeader}>Address</label>
          <p style={fontValue}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </Row>

        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Vehicle No.</label>
                <p style={fontValue}>54165416HBJU</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Vehicle Type</label>
                <p style={fontValue}>54165416HBJU</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Description</label>
          <p style={fontValue}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
          </p>
        </Row>
      </div>
    </Container>
  );
}

export default VehicleItem;
