import { Row, Col, Image, Container } from 'react-bootstrap';

function RawMaterialItem() {
  const fontHeader = { font: 'Roboto', color: '#62728D', fontSize: '12px' };
  const fontValue = { font: 'Roboto', fontSize: '12px' };
  return (
    <Container style={{ padding: '20px' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '7px' }}>
        <Row>
          <label style={fontHeader}>Breed Name</label>
          <p style={fontValue}>Aravinth Sankar</p>
        </Row>
        <Row>
          <Col lg="4">
            <label style={fontHeader}>Description</label>
            <p style={fontValue}>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
              amet.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default RawMaterialItem;
