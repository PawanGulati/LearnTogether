import React from 'react'

import { ReactComponent as CreateEventSVG } from '../../../constants/images/create_meetup.svg'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RoundedPaper from '../RoundedPaper';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import EventList from '../event-views/EventList';

const useStyles = makeStyles(theme=>({
  grid_flex:{
    display:'flex',
    alignItems:'flex-start',
    flexDirection:'column'
  },
  center:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}))

export default function StudentHomeView() {
  const classes = useStyles()
  
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
        <Grid container spacing={3}>
          {/* Create MEETUP */}
          <Grid item xs={12} height={'100%'}>
            <RoundedPaper height={300}>
              <Grid 
                container
                sx={{
                    flexDirection:{
                      xs:'column',
                      md:'row'
                    }
                  }}
                  height={'100%'}
                >
                <Grid
                  className={`${classes.grid_flex}`} 
                  height={'100%'}
                  item
                  p={3}
                  xs={12} md={7}
                >
                  <Typography variant='h5' fontWeight={600}>
                    Student Meetup
                  </Typography>
                  <Typography letterSpacing={1} style={{lineHeight:2, flex:1}} align='left'>
                    Meet with like minded buddies to interact and study
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{
                      fontWeight:600,
                      letterSpacing:1,
                    }}
                    fullWidth
                  >
                    Create Meetup
                  </Button>
                </Grid>
                <Grid className={`${classes.center}`} item height={'100%'} xs={12} md={5}>
                  <CreateEventSVG 
                    style={{
                      height:'90%',
                      width:'100%'
                    }}
                  />
                </Grid>
              </Grid>
            </RoundedPaper>
          </Grid>
          {/* Scheduled Meetups */}
          <Grid item xs={12}>
            <RoundedPaper height={180}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>Scheduled Meetups</Typography>
                <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}}>
                    <EventList />
                </Box>
            </RoundedPaper>
          </Grid>
          {/* Recent Meetups */}
          <Grid item xs={12}>
            <RoundedPaper height={180}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>Recent Meetups</Typography>
                <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}}>
                    <EventList />
                </Box>
            </RoundedPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
