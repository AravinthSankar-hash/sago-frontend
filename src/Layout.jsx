import React from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import AppRoutes from './routes.jsx';
import styled from 'styled-components';

const justForRef = {
  marginTop: '30px'
};
const headerStyle = {
  height: '8%'
};

const zeroPaddings = {
  padding: '0px'
};

const SpanBottom = styled.span`
  margin: 0;
  border: 1px solid #ebeef0;
`;

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
              <Header></Header>
              <SpanBottom></SpanBottom>
            </Row>
            <Row style={justForRef}>
              <AppRoutes />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
