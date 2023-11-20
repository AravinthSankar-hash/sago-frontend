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
  height: '56px'
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
          <Col style={zeroPaddings} lg="2" sm md="3">
            <Sidebar></Sidebar>
          </Col>
          {/* Considering full view port - header 56px as per figma and remaining for the dynamic routes*/}
          <Col className="vh-100">
            <Row style={headerStyle}>
              <Header></Header>
              <SpanBottom></SpanBottom>
            </Row>
            <Row style={{ height: 'calc(100% - 56px)' }}>
              <AppRoutes />
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
