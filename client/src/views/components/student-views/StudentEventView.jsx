import { Container, Grid, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import EventList from '../event-views/EventList'
import RoundedPaper from '../RoundedPaper'
import SearchBar from '../SearchBar'

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import DemandList from '../demand-views/DemandList'
import { set_my_demands } from '../../../utils/services/demands'
import { set_past_events } from '../../../utils/services/events'
const DemandListLoaded = withSpinner(DemandList)
const EventListLoaded = withSpinner(EventList)

export default function StudentEventView(props) {

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


  const [demandToggle, setDemandToggle] = React.useState('My Demands')
  const [eventToggle, setEventToggle] = React.useState('My Events')

  const handleChangeDemandToggle = () => {
    if(demandToggle === 'My Demands')
      setDemandToggle('All Demands')
    else
      setDemandToggle('My Demands')
  }

  const handleChangeEventToggle = () => {
    if(eventToggle === 'My Events')
      setEventToggle('All Events')
    else
      setEventToggle('My Events')
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
          <Grid container spacing={3} sx={{display:'flex', flexDirection:'column'}}>
            {/* SEARCH BAR */}
            <Grid item >
              <SearchBar />
            </Grid>
            {/* SUGGESTED EVENTS */}
            <Grid item >
              <RoundedPaper height={300}>
                <Box sx={{display:'flex', alignItems: 'center'}}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>{demandToggle}</Typography>
                  <Switch
                    checked={demandToggle === 'My Demands'}
                    onChange={handleChangeDemandToggle}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
                <DemandListLoaded isLoading={demands === null} demands={demands} />
              </RoundedPaper>
            </Grid>
            {/* PAST EVENTS */}
            <Grid item >
              <RoundedPaper height={300}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>{eventToggle}</Typography>
                  <Switch
                    checked={eventToggle === 'My Events'}
                    onChange={handleChangeEventToggle}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </Box>
                <EventListLoaded isLoading={events === null} events={events} />
              </RoundedPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
}
