//import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//icons

import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { Link,useLocation } from 'react-router-dom';



const drawerWidth = 210;

export default function PermanentDrawerLeft() {
  const NavDrawerTheme = createTheme({
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeightBold: 700,
      fontSize: 14,
      color:'green'
    },

  });

  const location = useLocation();
  const isCurrentPage = (path) => location.pathname === path;

  const navList = [
    { text: 'Sales Invoices', icon: <DescriptionIcon sx={{ color: 'green' }}/>, to:'/salesinvoice' },
    { text: 'Inventory', icon: <InventoryIcon sx={{ color: 'green' }}/>, to:'/product' },
    { text: 'Clients', icon: <HandshakeIcon sx={{ color: 'green' }}/>, to:'/clients' },
    { text: 'Overdue Invoices', icon: <MailIcon sx={{ color: 'green' }}/>, to:'/email' },
    { text: 'Stock Alerts', icon: <NotificationImportantIcon sx={{ color: 'green' }}/>,to:'/alerts' },
    { text: 'Reports', icon: <AssessmentIcon sx={{ color: 'green' }}/>, to:'/reports' },
    
  ];

  const miscList = [
    { text: 'User Control', icon: <ManageAccountsIcon sx={{ color: 'green' }}/>, to:'/usercontrol' },
  ]



  return (
    <Box sx={{ display: 'flex'  }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '4px 0px 8px rgba(0, 64, 0, 0.1)', // Add box shadow to the left edge
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <ThemeProvider theme={NavDrawerTheme}>
        <List>
        {/* <Divider /> */}
          {navList.map((item) => (
            <ListItem style={{ textDecoration: 'none', color: 'black' }}  key={item.text} disablePadding component={Link} to={`${item.to}`}
            sx={{ backgroundColor: isCurrentPage(item.to) ? 'rgba(0, 128, 0, 0.15)' : 'transparent' }}
            >
              <ListItemButton>
                <ListItemIcon> {item.icon}</ListItemIcon>
                          {/* <Link to="/">
                    <h1>EmailPage</h1>
                </Link>  */}
                <ListItemText style={{ textDecoration: 'none', color:'var(--primary)' }} ><strong>{item.text}</strong> </ListItemText>
                {/* <ListItemText primary={item.text}/> */}
              </ListItemButton>
            </ListItem>
          ))}
        
          {/* <Link to="/email">
                    <h1>EmailPage</h1>   this works but mapping does not
                </Link>  */}
        </List>

        <Divider />
        <List>
        {/* <Divider /> */}
          {miscList.map((item) => (
            <ListItem   key={item.text} disablePadding component={Link} to={`${item.to}`} 
            sx={{ backgroundColor: isCurrentPage(item.to) ? 'rgba(0, 128, 0, 0.15)' : 'transparent' }}>
              <ListItemButton>
                <ListItemIcon > {item.icon}</ListItemIcon>
                          {/* <Link to="/">
                    <h1>EmailPage</h1>
                </Link>  */}
                <ListItemText style={{ textDecoration: 'none', color:'var(--primary)' }} ><strong>{item.text}</strong> </ListItemText>
                {/* <ListItemText primary={item.text}  />   */}
              </ListItemButton>
            </ListItem>
          ))}
                {/* color:'var(--primary)' */}
          {/* <Link to="/email">
                    <h1>EmailPage</h1>   this works but mapping does not
                </Link>  */}
        </List>
        </ThemeProvider>
      </Drawer>
    </Box>
  );
}