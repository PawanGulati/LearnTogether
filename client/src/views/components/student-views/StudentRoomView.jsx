import React from 'react'

import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import { red } from '@mui/material/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '100%'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
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
          <Grid item xs={3} className={classes.borderRight500}>
              <List>
                  <ListItem button key="John Wick">
                      <ListItemIcon>
                      <Avatar alt="John Wick" sx={{bgcolor:red[300]}} src="https://material-ui.com/static/images/avatar/1.jpg" />
                      </ListItemIcon>
                      <ListItemText primary="John Wick"></ListItemText>
                  </ListItem>
              </List>
              <Divider />
              <Grid item xs={12} style={{padding: '10px'}}>
                  <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
              </Grid>
              <Divider />
              <List>
                  <ListItem button key="room1" selected>
                      <ListItemIcon>
                          <Avatar alt="Room1" src="https://material-ui.com/static/images/avatar/1.jpg" />
                      </ListItemIcon>
                      <ListItemText primary="Room 1">Room 1</ListItemText>
                  </ListItem>
                  <ListItem button key="room2">
                      <ListItemIcon>
                          <Avatar alt="Room2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                      </ListItemIcon>
                      <ListItemText primary="Room 2">Room 2</ListItemText>
                  </ListItem>
                  <ListItem button key="room3">
                      <ListItemIcon>
                          <Avatar alt="Room3" src="https://material-ui.com/static/images/avatar/2.jpg" />
                      </ListItemIcon>
                      <ListItemText primary="Room 3">Room 3</ListItemText>
                  </ListItem>
              </List>
          </Grid>
          <Grid item xs={9}>
              <List className={classes.messageArea}>
                  <ListItem key="1">
                      <Grid container>
                          <Grid item xs={12}>
                              <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                          </Grid>
                          <Grid item xs={12}>
                              <ListItemText align="right" secondary="09:30"></ListItemText>
                          </Grid>
                      </Grid>
                  </ListItem>
                  <ListItem key="2">
                      <Grid container>
                          <Grid item xs={12}>
                              <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                          </Grid>
                          <Grid item xs={12}>
                              <ListItemText align="left" secondary="09:31"></ListItemText>
                          </Grid>
                      </Grid>
                  </ListItem>
                  <ListItem key="3">
                      <Grid container>
                          <Grid item xs={12}>
                              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                          </Grid>
                          <Grid item xs={12}>
                              <ListItemText align="right" secondary="10:30"></ListItemText>
                          </Grid>
                      </Grid>
                  </ListItem>
              </List>
              <Divider />
              <Grid container style={{padding: '20px'}}>
                  <Grid item xs={11}>
                      <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                  </Grid>
                  <Grid xs={1} align="right">
                      <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
    </Container>
    </Box>
  )
}
