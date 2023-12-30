import * as React from 'react';
import Box from '@mui/material/Box';
import { Row, Col } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { sideBarItems } from '../data/sidebar-items.const';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import sago_logo from '../assets/images/sago_logo.svg';

const drawerWidth = 280;

function SidebarResp(props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const SidebarHeaderName = styled.p`
    margin: 0;
    align-items: center;
  `;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className="m-0">
        <Toolbar style={{ backgroundColor: '#00B7FF', color: 'white' }}>
          <Row style={{ alignItems: 'center' }}>
            <Col lg="10" style={{ display: 'flex' }}>
              <img src={sago_logo} alt="" />
              <SidebarHeaderName>Sree Ambika Sago</SidebarHeaderName>
            </Col>
            <Col lg="2" style={{ backgoundColor: '#57D0FF' }}>
              <FontAwesomeIcon icon={faAngleDown} />
            </Col>
          </Row>
        </Toolbar>
        <Divider />
      </div>
      <div style={{ background: '#0A3546', padding: '24px' }}>
        {sideBarItems.map((itemSection, parentIdx) => (
          <>
            <List key={parentIdx} style={{ color: '#5C9EB8', fontSize: '12px' }}>
              {itemSection.itemHeader}

              {itemSection.items.map((items, idx) => (
                <ListItem key={idx} disablePadding style={{ color: 'white', fontSize: '14px' }}>
                  <ListItemButton onClick={() => navigate(items?.route || '/')}>
                    <ListItemIcon style={{ color: 'white' }}>
                      <img src={items.src} alt="icon" />
                    </ListItemIcon>
                    <ListItemText>{items.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        ))}
        <p style={{ color: '#5C9EB8', fontSize: '10px', alignItems: 'center' }}>Version 0.1</p>
      </div>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}>
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

// SidebarResp.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window: PropTypes.func
// };

export default SidebarResp;
