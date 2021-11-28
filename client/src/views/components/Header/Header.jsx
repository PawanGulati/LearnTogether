import React from 'react'

import styled  from '@mui/material/styles/styled';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';

import red from '@mui/material/colors/red'
import { connect } from 'react-redux';

import Drawer from './Drawer';
import { auth_message, logout } from '../../../store/user-store/user-actions';
import MenuDropDown from './MenuDropDown';

/**
 * Drawer Size
 * @type {number}
 */
const drawerWidth = 240;

/**
 * Customizing AppBar styles
 */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


/**
 * 
 * @param {Function} dispatch 
 * @returns Object
 */
const mapDispatchToProps = dispatch =>({
  logout: () => dispatch(logout()),
  set_auth_message: (message,type,open) => dispatch(auth_message(message,type,open)),
})

export default connect(null, mapDispatchToProps)(function HeaderDrawer(props) {
    
    // Drawer open triggerr
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // profile drop down
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dropList = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    // logout handler
    const handleLogout = ()=>{
      props.set_auth_message('You have successfully Logout out','success',true)
      props.logout()
    }

    return (
        <>
          <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px',
                }}
                style={{
                  display:"flex",
                  ...(open ? { justifyContent: "flex-end" } : { justifyContent: "space-between" })
                }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                    ...(open && { display: 'none' }),
                  }}
                >
                <MenuIcon />
              </IconButton>
              
              <Stack direction="row" spacing={3} alignItems='center'>
                
                <IconButton aria-label='message-button' edge="end" color="inherit">
                  <Badge badgeContent={5} color="error">
                      <ChatIcon />
                  </Badge>
                </IconButton>
                
                <IconButton aria-label='person-button' edge="end" color="inherit">
                  <Badge badgeContent={2} color="error">
                      <PersonIcon />
                  </Badge>
                </IconButton>
                
                <IconButton aria-label='notification' edge="end" color="inherit">
                  <Badge badgeContent={4} color="error">
                      <NotificationsIcon />
                  </Badge>
                </IconButton>
                
                <IconButton aria-label='avatar' edge="end" color="inherit" onClick={handleClick}>
                  <Avatar sx={{bgcolor: red[300]}}>P</Avatar>
                </IconButton>

                <MenuDropDown
                  anchorEl={anchorEl}
                  dropList={dropList}
                  handleClose={handleClose}
                  handleLogout={handleLogout}
                />
              </Stack>
            </Toolbar>
          </AppBar>
          <Drawer 
            toggleDrawer={toggleDrawer} 
            open={open} 
            drawerWidth={drawerWidth} 
            isSecondary={false}
          />
        </>
    )
})
