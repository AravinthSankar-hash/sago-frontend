import React from 'react';
import { sideBarItems } from '../data/sidebar-items.const';
import styled from 'styled-components';
import sago_logo from '../assets/images/sago_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

// Inline styles
const itemWrapper = {
  display: 'inline-flex',
  color: 'blue',
  margin: '0 35px',
  'margin-top': '15px'
};

const headerHeadDropdown = {
  padding: '20px 0',
  background: '#57D0FF',
  textAlign: 'center'
};

const logoFix = {
  margin: '0 5px',
  width: '35px',
  height: '30px',
  padding: '0px 5px'
};

// Styled-components
const SidebarParent = styled.div`
  background: #0a3546;
  width: auto;
  height: 100vh;
`;
const SidebarHead = styled.div`
  background: #00b7ff;
  color: #ffffff;
  font-family: Roboto;
  display: flex;
  font-size: 16px;
`;
const SidebarHeader = styled.p`
  padding-top: 0%;
  color: #5c9eb8;
  font-family: Roboto;
  margin: 13px 35px;
  font-size: 10px;
`;
const SidebarHeaderName = styled.p`
  margin: 0;
  align-items: center;
`;
const SidebarFooter = styled.p`
  position: absolute;
  bottom: 5%;
  margin-left: 5%;
  font-weight: bolder;
  letter-spacing: 0.1em;
  font-family: Roboto;
  font-size: 12px;
  color: #00b7ff;
`;
const SideBarItems = styled.div`
  color: #ffffff;
  padding: 0px 28px;
  text-align: center;
  transition: all 0.25s ease-in-out;
  margin: 0px 0;
  font: 14px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
  &:hover:not(:first-child) {
    font-weight: bold;
  }
`;
const SideBarItemIcon = styled.img`
  padding-top: 0px;
`;

const Sidebar = () => {
  return (
    <SidebarParent>
      <SidebarHead>
        <Container fluid>
          <Row style={{ alignItems: 'center' }}>
            <Col lg="10" style={{ display: 'flex' }}>
              <img src={sago_logo} alt="" style={logoFix} />
              <SidebarHeaderName>Sree Ambika Sago</SidebarHeaderName>
            </Col>
            <Col lg="2" style={headerHeadDropdown}>
              <FontAwesomeIcon icon={faAngleDown} />
            </Col>
          </Row>
        </Container>
      </SidebarHead>
      {sideBarItems.map((itemSection, parentIdx) => (
        <>
          <SidebarHeader key={parentIdx}>{itemSection.itemHeader}</SidebarHeader>
          {itemSection.items.map((items, idx) => (
            <div key={idx} style={itemWrapper}>
              <SideBarItemIcon src={items.src}></SideBarItemIcon>
              <SideBarItems>{items.name}</SideBarItems>
            </div>
          ))}
        </>
      ))}
      <SidebarFooter>Version 0.1</SidebarFooter>
    </SidebarParent>
  );
};

export default Sidebar;
