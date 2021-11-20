import React from 'react'

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import ListItems from '../ListItems';

let drawerWidth

const NewDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Drawer({toggleDrawer, open, drawerWidth: dw}) {
    drawerWidth = dw;

    return (
        <NewDrawer open={open} variant="permanent">
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
              
            <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
            </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <ListItems />
            </List>
        </NewDrawer>
    )
}
