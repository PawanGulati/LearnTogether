import { Container, Grid, IconButton, InputBase, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import SearchIcon from '@mui/icons-material/Search'
import EventList from '../event-views/EventList'
import RoundedPaper from '../RoundedPaper'

export default function StudentEventView() {
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
                <Paper 
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Events"
                    inputProps={{ 'aria-label': 'search events' }}
                  />
                  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
              {/* SUGGESTED EVENTS */}
              <Grid item >
                <RoundedPaper height={300}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>Suggested Events</Typography>
                  <Box style={{height:'100%', width:'100%', maxHeight:'100%', overflow:'auto'}}>
                      <EventList />
                  </Box>
                </RoundedPaper>
              </Grid>
              {/* PAST EVENTS */}
              <Grid item >
                <RoundedPaper height={300}>
                  <Typography align='left' fontWeight={600} mb={1} letterSpacing={1}>Past Events</Typography>
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
