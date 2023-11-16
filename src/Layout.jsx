import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import AppRoutes from './routes.jsx';

const justForRef = {
  border: '2px solid grey'
};
const headerStyle = {
  height: '5%'
};

const zeroPaddings = {
  padding: '0px'
};

const Layout = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col style={zeroPaddings} lg="2" sm>
            <Sidebar></Sidebar>
          </Col>
          <Col>
            <Row style={headerStyle}>
              <Col lg style={justForRef}>
                <Header></Header>
              </Col>
            </Row>
            <Row>
              <AppRoutes />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
