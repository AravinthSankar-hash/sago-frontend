import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import notiIcon from '../assets/images/bell.svg';
import avatarIcon from '../assets/images/avatar_icon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// Inline styles
function Header() {
  const rowStyle = {
    alignItems: 'right'
  };
  const belIcon = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  };
  const dropDown = {
    margin: '10px 0 0 15px',
    color: 'gray'
  };
  const profileWrapper = {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '10px'
  };
  const avatar = {
    marginBottom: '10px',
    alignItems: 'center'
  };

  // Styled-components
  const Profile = styled.div`
    display: grid;
    margin-left: 10px;
    text-align: center;
  `;
  const SpanLine = styled.span`
    margin: 5px 25px 15px 0;
    align-items: center;
    border-left: 1px solid #b2b3b7;
  `;
  const ProName = styled.p`
    font-size: 14px;
    font-weight: bold;
    font-family: Roboto;
    margin: 0px;
    padding-left: 0px;
  `;
  const ProRole = styled.p`
    font-size: 12px;
    font-eight: lighter;
    font-family: Roboto;
    color: #62728d;
    text-align: left;
  `;

  return (
    <div>
      <Container fluid>
        <Row style={rowStyle}>
          <Col lg="10" style={belIcon}>
            <img src={notiIcon} alt=""></img>
          </Col>
          <Col lg="2" style={profileWrapper}>
            <SpanLine></SpanLine>
            <img src={avatarIcon} alt="" style={avatar}></img>
            <Profile>
              <ProName>Ranjith raj</ProName>
              <ProRole>Admin</ProRole>
            </Profile>
            <FontAwesomeIcon icon={faAngleDown} style={dropDown} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
