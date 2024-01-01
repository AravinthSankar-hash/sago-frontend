import { Row, Col, Image, Container } from 'react-bootstrap';
import dp_icon from '../../../assets/images/penguin.jpeg';

function StaffItem() {
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
          <p style={fontValue}>Aravinth Sankar</p>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Designtion</label>
                <p style={fontValue}>Feeder</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Qualification</label>
                <p style={fontValue}>M Phil.</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Email</label>
                <p style={fontValue}>aravinthsankarhash@gmail.com</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Phone Number</label>
                <p style={fontValue}>+91 9486175156</p>
              </div>
            </Col>
          </div>
        </Row>
        <Row>
          <label style={fontHeader}>Address</label>
          <p style={fontValue}>22/13 Bajanai koil 2nd street, Choolaimedu chennai-94</p>
        </Row>
        <Row>
          <div style={{ display: 'flex' }}>
            <Col lg="3">
              <div>
                <label style={fontHeader}>Aadhar No.</label>
                <p style={fontValue}>54165416HBJU</p>
              </div>
            </Col>
            <Col lg="3">
              <div>
                <label style={fontHeader}>PAN No.</label>
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

export default StaffItem;
