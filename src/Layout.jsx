import Header from './components/Header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import AppRoutes from './routes.jsx';
import SidebarResp from 'components/SidebarResp.jsx';

const headerStyle = {
  height: '65px',
  borderBottom: '1px solid #EBEEF0'
};

const zeroPaddings = {
  padding: '0px'
};

const Layout = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col style={zeroPaddings} className="sidebar" lg={2}>
            <SidebarResp></SidebarResp>
          </Col>
          {/* Considering full view port - header 56px as per figma and remaining for the dynamic routes*/}
          <Col className="vh-100" lg={10}>
            <Row style={headerStyle}>
              <Header></Header>
            </Row>
            <Row style={{ height: 'calc(100% - 65px)' }}>
              <AppRoutes />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
