import React from "react";
import { sideBarItems } from "../data/sidebar-items.const";
import styled from "styled-components";

// Inline styles
const itemWrapper = {
  display: "flex",
  color: "blue",
};

// Styled-components
const SidebarParent = styled.div`
  background: #0a3546;
  width: 250px;
  height: 100vh;
`;
const SidebarHeader = styled.p`
  color: #5c9eb8;
  font-family: Roboto;
`;
const SideBarItems = styled.div`
  color: #ffffff;
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  margin: 4px 12px;
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
    <>
      <SidebarParent>
        {sideBarItems.map((itemSection, parentIdx) => (
          <>
            <SidebarHeader key={parentIdx}>
              {itemSection.itemHeader}
            </SidebarHeader>
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
    </>
  );
};

export default Sidebar;
