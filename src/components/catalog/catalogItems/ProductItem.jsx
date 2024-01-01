import { Row, Col, Container } from 'react-bootstrap';
import React from 'react';

function ProductItem({ productDetails }) {
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
                <p style={fontValue}>{productDetails.product_name}</p>
              </div>
            </Col>
            <Col lg="2">
              <div>
                <label style={fontHeader}>Food Safety</label>
                <p style={fontValue}>{productDetails.is_food_safe}</p>
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
                <p style={fontValue}>{productDetails.unit}</p>
              </div>
            </Col>
            <Col lg="2">
              <div>
                <label style={fontHeader}>HSN Code</label>
                <p style={fontValue}>{productDetails.hsn_code}</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Tax%</label>
                <p style={fontValue}>{productDetails.tax_percent} %</p>
              </div>
            </Col>
          </div>
        </Row>

        <Row>
          <label style={fontHeader}>Description</label>
          <p style={fontValue}>{productDetails.description}</p>
        </Row>
      </div>
    </Container>
  );
}

export default ProductItem;
