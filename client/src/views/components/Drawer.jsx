import React from 'react'

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import ListItems from './ListItems';
import RoomListItems from './RoomListItems'
import { Button, Typography } from '@mui/material';

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

    const [roomView, setRoomView] = React.useState(false);

    const showRoomsList = (show) =>{
        setRoomView(show)
    }

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
                {
                    roomView ? (
                        <Button>
                            <Typography variant="h7"  onClick={()=>{showRoomsList(false)}}>Back</Typography>
                        </Button>
                    )
                    :(
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    )
                }
            </Toolbar>
            <Divider />
            <List>
                {
                    roomView ? <RoomListItems /> : <ListItems showRoomsList={showRoomsList} />
                }
            </List>
        </NewDrawer>
    )
}
