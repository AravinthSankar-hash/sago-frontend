import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { sideBarItems } from '../data/sidebar-items.const';
import { useNavigate } from 'react-router-dom';
import sago_logo from '../assets/images/sago_logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 280;

function SidebarResp(props) {
  const navigate = useNavigate();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div className="w-100 h-100">
      <div style={{ background: '#0A3546', height: '100%' }}>
        <div style={{ backgroundColor: '#00B7FF', color: 'white', alignItems: 'center' }}>
          <Toolbar className="d-flex justify-content-between p-0">
            <div className="d-flex px-3 gap-3 align-items-center">
              <img style={{ width: '30px' }} src={sago_logo}></img>
              <p className="p-0 m-0">Sree Ambika Sago</p>
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                backgroundColor: '#57D0FF',
                padding: '0px',
                height: '65px',
                width: '65px',
                alignItems: 'center',
                marginRight: '0px'
              }}>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </Toolbar>
          {/* <Divider /> */}
        </div>
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}> */}
        {/* <div> */}
        {sideBarItems.map((itemSection, parentIdx) => (
          <>
            <List key={parentIdx} style={{ color: '#5C9EB8', padding: '24px', fontSize: '12px' }}>
              {itemSection.itemHeader}

              {itemSection.items.map((items, idx) => (
                <ListItem key={idx} disablePadding style={{ color: 'white', fontSize: '14px' }}>
                  <ListItemButton className="px-0" onClick={() => navigate(items?.route || '/')}>
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
        {/* </div> */}
        {/* <div>
          <p
            style={{
              color: '#5C9EB8',
              fontSize: '10px'
              // alignItems: 'center',
              // verticalAlign: 'end',
              // height: '100%'
            }}>
            Version 0.1
          </p>
        </div> */}
        {/* </div> */}
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
