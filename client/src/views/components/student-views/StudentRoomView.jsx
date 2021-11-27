import React from 'react'

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import RoomList from '../room-views/RoomList';
import Room from '../room-views/Room';

import RoomTabs from '../room-views/RoomTabs'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%',
    borderRadius:10
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0',
      display:'flex',
      justifyContent:'center',
      alignItems: 'center'
  }
});

export default function StudentRoomView() {
  const classes = useStyles();

  return (
      <Box
        component="main"
        display="flex"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 8}}>
        {/* Chat Section */}
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={1} className={classes.borderRight500}>
                <RoomTabs />
            </Grid>
            <Room />    
      </Grid>
    </Container>
    </Box>
  )
}
