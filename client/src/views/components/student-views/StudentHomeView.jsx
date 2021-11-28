import React from 'react'

import { ReactComponent as CreateEventSVG } from '../../../constants/images/create_meetup.svg'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import RoundedPaper from '../RoundedPaper';
import EventList from '../event-views/EventList';
import DemandList from '../demand-views/DemandList';
import SnackBar from '../../../utils/NotificationPopUp/SnackBar';
import { create_demand, set_my_demands } from '../../../utils/services/demands';
import { set_past_events } from '../../../utils/services/events';
import CreateDemandModal from '../create-chip-dialog/CreateChipModal';

import withSpinner from '../../../hoc/withSpinner/withSpinner'
const DemandListLoaded = withSpinner(DemandList)
const EventListLoaded = withSpinner(EventList)

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
  
  const reload=()=>window.location.reload();

  const [demands, setDeamnds] = React.useState(null)
  const [events, setEvents] = React.useState(null)

  React.useEffect(()=>{
    let mounted = true
    
    set_my_demands().then(demands => {
      if(mounted) setDeamnds(demands)
    })
    
    return () => mounted = false
  },[])
  
  React.useEffect(()=>{
    let mounted = true
    
    set_past_events().then(events => {
      if(mounted) setEvents(events)
    })
    
    return () => mounted = false
  },[])

  // modal state
  const [text, setText] = React.useState("student");

  const [open, setOpen] = React.useState(false);

  const handleOpen = (t) => {setOpen(true); setText(t)}
  const handleClose = () => {setOpen(false); reload();}

  // event toggle
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
          <Grid item xs={12} height={'100%'} width={'100%'}>
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
                  <Typography variant='h4' fontWeight={600}>
                    Student Meetup
                  </Typography>
                  <Typography letterSpacing={1} style={{lineHeight:2, flex:1}} align='left'>
                    Meet with like minded buddies to interact and study
                  </Typography>
                  <Button
                    aria-label='create-request'
                    variant='contained'
                    sx={{
                      fontWeight:600,
                      letterSpacing:1,
                      wordSpacing:3,
                      my:3
                    }}
                    size='large'
                    onClick={()=>handleOpen('Request')}
                    fullWidth
                  >
                    Create Request
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
          <Grid item xs={12} height={'100%'} width={'100%'}>
            <RoundedPaper height={230}>
              <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>My Requests</Typography>
              <DemandListLoaded isLoading={demands === null} demands={demands} />
            </RoundedPaper>
          </Grid>
          {/* Recent Meetups */}
          <Grid item xs={12} height={'100%'} width={'100%'}>
            <RoundedPaper height={230}>
              <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}} mb={1}>
                <Typography align='left' fontWeight={600}  letterSpacing={1}>My Events</Typography>
                <Box sx={{display:'flex', alignItems:'center'}}>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography
                    fontWeight={550}
                    variant='subtitle1'
                  >Scheduled</Typography>
                </Box>
              </Box>
              <EventListLoaded isLoading={events === null} events={events} checked={checked} />
            </RoundedPaper>
          </Grid>
        </Grid>
      </Container>
      <CreateDemandModal open={open} handleClose={handleClose} text={text} create_async={create_demand} />
      <SnackBar />
    </Box>
  )
}
