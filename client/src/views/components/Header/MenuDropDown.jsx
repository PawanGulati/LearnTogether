import React from 'react'

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavLink } from 'react-router-dom';

export default function MenuDropDown(props) {
    return (
        <Menu
            anchorEl={props.anchorEl}
            open={props.dropList}
            onClose={props.handleClose}
            onClick={props.handleClose}
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
            <NavLink
                style={{ display: 'flex', alignItems: 'center' }}
                to="/profile"
            >
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            </NavLink>
            
            <Divider />
            <MenuItem>
            <ListItemIcon>
                <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
            </MenuItem>
            <MenuItem>
            <ListItemIcon onClick={props.handleLogout}>
                <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
    )
}
