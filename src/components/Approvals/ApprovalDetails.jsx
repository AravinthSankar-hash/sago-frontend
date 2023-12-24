import TPDetails from 'components/tapicoPurchase/TPDetails';
import { Button, Container, Row, Col } from 'react-bootstrap';
function ApprovalDetails() {
  return (
    <Container style={{ marginLeft: '5px' }}>
      <Row>
        <TPDetails />
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'end', marginTop: '10px' }}>
        <Col lg="1">
          <Button variant="primary">Approve</Button>
        </Col>
        <Col lg="1">
          <Button variant="danger">Reject</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ApprovalDetails;
