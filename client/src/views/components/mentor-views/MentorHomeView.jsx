import React from 'react'

import { ReactComponent as CreateEventSVG } from '../../../constants/images/create_meetup.svg'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RoundedPaper from '../RoundedPaper';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';

import BookingList from '../booking-views/BookingsList';
import SnackBar from '../../../utils/NotificationPopUp/SnackBar';

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import CreateDemandModal from '../demand-views/CreateDemandModal';
import { set_my_bookings } from '../../../utils/services/bookings';

const BookingListLoaded = withSpinner(BookingList)

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

export default function MentorHomeView() {
  const classes = useStyles()
  
//   const reload=()=>window.location.reload();

  const [events, setEvents] = React.useState(null)

  React.useEffect(()=>{
    let mounted = true
    
    set_my_bookings().then(events => {
      if(mounted) setEvents(events)
    })
    
    return () => mounted = false
  },[])

  // modal state
  const [text, setText] = React.useState("student");

  const [open, setOpen] = React.useState(false);

  const handleOpen = (t) => {setOpen(true); setText(t)}
  const handleClose = () => {setOpen(false); }

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
          {/* Create EVENTS */}
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
                    Schedule an Event
                  </Typography>
                  <Typography letterSpacing={1} style={{lineHeight:2, flex:1}} align='left'>
                    Schedule sessions to help students to elevate their carrier
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{
                      fontWeight:600,
                      letterSpacing:1,
                    }}
                    onClick={()=>handleOpen('Demands')}
                    fullWidth
                  >
                    Create Event
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
          {/* My Bookings */}
          <Grid item xs={12} height={'100%'}>
            <RoundedPaper height={330}>
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}} mb={1}>
                    <Typography align='left' fontWeight={600}  letterSpacing={1}>My Bookings</Typography>
                </Box>
                <BookingListLoaded isLoading={events === null} bookings={events}  />
            </RoundedPaper>
          </Grid>
        </Grid>
      </Container>
      <CreateDemandModal open={open} handleClose={handleClose} text={text} />
      <SnackBar />
    </Box>
  )
}
