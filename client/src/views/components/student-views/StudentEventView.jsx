import React from 'react'

import { Container, Grid, Tab, Typography, Box, Button } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import EventList from '../event-views/EventList'
import RoundedPaper from '../RoundedPaper'
import SearchBar from '../SearchBar'
import SnackBar from '../../../utils/NotificationPopUp/SnackBar'

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import DemandList from '../demand-views/DemandList'
import { demand_to_event, set_all_demands } from '../../../utils/services/demands'
import { join_event, set_all_events, set_all_sessions } from '../../../utils/services/events'
const DemandListLoaded = withSpinner(DemandList)
const EventListLoaded = withSpinner(EventList)


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentEventView(props) {
  
  // Search Bar State
  const [topic, setTopic] = React.useState('')

  const handleInputChange = ({target: {value}}) =>{
    setTopic(value)
  }

  const handleInputSubmit = (event)=>{
    event.preventDefault()
    setTopic('')
  }

  // const reload=()=>window.location.reload();

  const [demands, setDemands] = React.useState(null)
  const [events, setEvents] = React.useState(null)

  // LifeCycle Methods
  React.useEffect(()=>{
    let mounted = true

    set_all_demands().then(demands => {
      if(mounted) setDemands(demands)
    })

    return () => mounted = false
  },[])

  React.useEffect(()=>{
    let mounted = true

    set_all_events().then(events => {
      if(mounted) setEvents(events)
    })

    return () => mounted = false
  },[])


  // Tabs States
  const [valueEvent, setValueEvent] = React.useState('1');
  const [valueDemand, setValueDemand] = React.useState('1');

  const handleChangeEvent = (event, newValue) => {
    
    let mounted = true

    if(newValue === '1'){
      set_all_events().then(events => {
        if(mounted) setEvents(events)
      })
    }else if(newValue === '2'){
      set_all_sessions().then(events => {
        if(mounted) setEvents(events)
      })
    }
    
    setValueEvent(newValue);
    return () => mounted = false
  };

  const handleChangeDemand = (event, newValue) => {
    
    let mounted = true

    if(newValue === '1'){
      set_all_demands().then(demands => {
        if(mounted) setDemands(demands)
      })
    }
    
    setValueDemand(newValue);
    return () => mounted = false
  };

  // Dialog States
  const [openPropmt, setOpenPropmt] = React.useState(false);
  const [isEvent, setAsEvent] = React.useState(true)
  const [cur_event, set_cur_event] = React.useState(null)

  const handleOpenPrompt = (event, isEvent) => {
    setOpenPropmt(true);
    set_cur_event(event);
    if(isEvent)
      setAsEvent(true)
    else
      setAsEvent(false)
  };

  const handleClosePrompt = () => {
    setOpenPropmt(false);
  };

  const handleSubmit = (isEvent) =>{
    if(cur_event && isEvent){
      join_event(cur_event._id)
    }

    if(cur_event && !isEvent){
      demand_to_event(cur_event._id)
    }
    
    setOpenPropmt(false);
    // reload()
  }


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
          {/* main content */}
          <Grid container spacing={3} sx={{display:'flex', flexDirection:'column'}}>
            {/* SEARCH BAR */}
            <Grid item >
              <SearchBar
                placeholder='Search Events'
                value={topic}
                handleInputChange={handleInputChange}
                handleInputSubmit={handleInputSubmit}
              />
            </Grid>
            {/* ALL DEMANDS */}
            <Grid item height={'100%'} width={'100%'} >
              <RoundedPaper height={350}>
                  <Box sx={{width:'100%', height:'100%', typography: 'body1', overflow: 'hidden'}} pb={4}>
                    <TabContext value={valueDemand}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChangeDemand} aria-label="lab API tabs example">
                          <Tab label="All Requests" value="1" />
                          <Tab label="Suggested Requests" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel value="1" sx={{height:'100%'}}>
                        <DemandListLoaded 
                          isLoading={demands === null} 
                          demands={demands} 
                          options={true} 
                          checked={false}
                          handleOpenJoinPropmt={handleOpenPrompt}
                        />
                      </TabPanel>
                      <TabPanel value="2">Coming Soon...</TabPanel>
                    </TabContext>
                </Box>
              </RoundedPaper>
            </Grid>
            {/* ALL EVENTS */}
            <Grid item height={'100%'} width={'100%'} >
              <RoundedPaper height={'100%'}>
                <Box sx={{width:'100%', typography: 'body1'}}>
                  <TabContext value={valueEvent}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChangeEvent} aria-label="lab API tabs example">
                        <Tab label="All Requested Events" value="1" />
                        <Tab label="All Scheduled Events" value="2" />
                        <Tab label="Suggested Events" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1"sx={{height:'100%'}}>
                      <EventListLoaded 
                        isLoading={events === null} 
                        events={events} 
                        options={true} 
                        checked={false}
                        handleOpenJoinPropmt={handleOpenPrompt}
                      />
                    </TabPanel>
                    <TabPanel value="2"sx={{height:'100%'}}>
                      <EventListLoaded 
                        isLoading={events === null} 
                        events={events} 
                        options={true} 
                        checked={true}
                        handleOpenJoinPropmt={handleOpenPrompt}
                      />
                    </TabPanel>
                    <TabPanel value="3">Coming Soon...</TabPanel>
                  </TabContext>
                </Box>
              </RoundedPaper>
            </Grid>
          </Grid>
          {/* Dialog modal for prompting */}
          {cur_event &&
            <Dialog
              open={openPropmt}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClosePrompt}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{ 
                isEvent ? "Do you like to join this EVENT ?" : "Do you like to convert this DEMAND ?"
              }</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box sx={{display: 'flex'}}>
                      {
                        cur_event['topics'].map((topic, id)=>
                          <Typography key={id} sx={{textTransform: 'capitalize'}}>
                            {topic + (id === cur_event['topics'].length-1 ? '': ', ')}
                          </Typography>
                        )
                      }
                    </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosePrompt}>Disagree</Button>
                <Button onClick={ () => handleSubmit(isEvent) }>Agree</Button>
              </DialogActions>
            </Dialog>
          }
        </Container>
        <SnackBar />
      </Box>
    )
}
