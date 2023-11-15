import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Table from '../components/Table';
function Procurements() {
  return (
    <Container>
      <Row style={{ height: '100%', background: 'grey' }}>
        <Col>Pages Sub Header</Col>
      </Row>
      <Row style={{ background: '#EBEEF0' }}>
        <Col style={{ background: '#EBEEF0' }}>
          <Table></Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Procurements;
