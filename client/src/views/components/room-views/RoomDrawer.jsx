import React from 'react'

import {Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240

export default function RoomDrawer() {
    return (
        <Box>
            <Drawer
                variant="permanent"
                sx={{
                height:'100%',
                width: drawerWidth,
                // flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                <List>
                    {['Room 1', 'Room 2', 'Room 3', 'Room 4'].map(text => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                </Box>
            </Drawer>
        </Box>
    )
}
