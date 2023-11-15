import React from 'react';
import { sideBarItems } from '../data/sidebar-items.const';
import styled from 'styled-components';

// Inline styles
const itemWrapper = {
  display: 'flex',
  color: 'blue'
};

// Styled-components
const SidebarParent = styled.div`
  background: #0a3546;
  width: auto;
  height: 100vh;
`;
const SidebarHead = styled.div`
  background: #00b7ff;
  padding: 20px;
  color: #ffffff;
  font-size: 20px;
  font-family: Roboto;
`;
const SidebarHeader = styled.p`
  color: #5c9eb8;
  font-family: Roboto;
  margin: 3%;
`;
const SideBarItems = styled.div`
  color: #ffffff;
  padding: 0px 24px;
  transition: all 0.25s ease-in-out;
  margin: 0px 12px;
  font: 14px;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
  }
  &:hover:not(:first-child) {
    font-weight: bold;
  }
`;
const SideBarItemIcon = styled.img``;

const Sidebar = () => {
  return (
    <SidebarParent>
      <SidebarHead>Sree Ambika Sago</SidebarHead>
      {sideBarItems.map((itemSection, parentIdx) => (
        <>
          <SidebarHeader key={parentIdx}>{itemSection.itemHeader}</SidebarHeader>
          {itemSection.items.map((items, idx) => (
            <div key={idx} style={itemWrapper}>
              <SideBarItemIcon src={items.src}></SideBarItemIcon>
              <SideBarItems>
                <p>{items.name}</p>
              </SideBarItems>
            </div>
          ))}
        </>
      ))}
    </SidebarParent>
  );
};

export default Sidebar;
