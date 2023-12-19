import React from 'react';
import notiIcon from '../assets/images/bell.svg';
import avatarIcon from '../assets/images/avatar_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Inline styles
function Header() {
  const dropDown = {
    margin: '10px 0 0 15px',
    color: 'gray'
  };
  const SpanLine = styled.span`
    margin: 5px 25px 15px 0;
    align-items: center;
    border-left: 1px solid #b2b3b7;
  `;
  return (
    <Navbar style={{ padding: '0px', backgroundColor: '#FFFFFF', }}>
      <Container >
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ paddingRight: '1.5rem' }}>
            <img src={notiIcon} alt="" />
          </Navbar.Text>
          <Navbar.Text>
            <SpanLine></SpanLine>
          </Navbar.Text>
          <Navbar.Text>
            <img src={avatarIcon} alt="" style={{}} />
          </Navbar.Text>
          <Navbar.Text
            style={{
              paddingRight: '0.5rem',
              paddingLeft: '0.5rem',
              fontSize: '14px',
              font: 'roboto',
              color: '#191C24',
              fontWeight: 'bold'
            }}>
            Ranjith raj
          </Navbar.Text>
          <Navbar.Text>
            <FontAwesomeIcon icon={faAngleDown} style={dropDown} />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
