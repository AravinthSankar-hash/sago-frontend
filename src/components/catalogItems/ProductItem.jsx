import { Row, Col, Container } from 'react-bootstrap';
import React from 'react';

function ProductItem() {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ padding: '20px' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '7px' }}>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="2">
              <div>
                <label style={fontHeader}>Product Name</label>
                <p style={fontValue}>Chiccken</p>
              </div>
            </Col>
            <Col lg="2">
              <div>
                <label style={fontHeader}>Food Safety</label>
                <p style={fontValue}>Yes</p>
              </div>
            </Col>
          </div>
        </Row>
      </div>
      <div style={{ padding: '20px', background: 'white', borderRadius: '7px' }}>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="2">
              <div>
                <label style={fontHeader}>Unit</label>
                <p style={fontValue}>Bags</p>
              </div>
            </Col>
            <Col lg="2">
              <div>
                <label style={fontHeader}>HSN Code</label>
                <p style={fontValue}>1971</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Tax%</label>
                <p style={fontValue}>10%</p>
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

export default ProductItem;
