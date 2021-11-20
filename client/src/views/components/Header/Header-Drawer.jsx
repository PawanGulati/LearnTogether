import React from 'react'

import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {red} from '@mui/material/colors'
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Stack } from '@mui/material';

import { connect } from 'react-redux';
import Drawer from './Drawer';
import { auth_message, logout } from '../../../store/user-store/user-actions';

const drawerWidth = 240;

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

const mapDispatchToProps = dispatch =>({
  logout: () => dispatch(logout()),
  set_auth_message: (message,type,open) => dispatch(auth_message(message,type,open)),
})

export default connect(null, mapDispatchToProps)(function HeaderDrawer(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // profile list
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
                      <IconButton edge="end" color="inherit">
                      <Badge badgeContent={4} color="secondary">
                          <NotificationsIcon />
                      </Badge>
                      </IconButton>
                      <IconButton edge="end" color="inherit" onClick={handleClick}>
                        <Avatar sx={{bgcolor: red[300]}}>P</Avatar>
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        open={dropList}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem>
                          <Avatar /> Profile
                        </MenuItem>
                        <MenuItem>
                          <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                          <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                          </ListItemIcon>
                          Settings
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon onClick={handleLogout}>
                            <LogoutIcon fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                  </Stack>
                </Toolbar>
            </AppBar>
            <Drawer toggleDrawer={toggleDrawer} open={open} drawerWidth={drawerWidth} isSecondary={false}/>
        </>
    )
})
