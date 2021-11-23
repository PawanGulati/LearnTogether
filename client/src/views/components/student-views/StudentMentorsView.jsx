import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SearchBar from '../SearchBar'

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import MentorList from '../mentor-views/MentorList'
import { set_mentors } from '../../../utils/services/mentors'

const MentorListLoaded = withSpinner(MentorList)

export default function StudentMentorsView() {

  const [mentors, setMentors] = React.useState(null)

  React.useEffect(()=>{
    let mounted = true

    set_mentors().then(events => {
      if(mounted) setMentors(events)
    })

    return () => mounted = false
  },[])

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
      {/* SEARCH BAR */}
      <SearchBar placeholder='Search Mentors' />
      <Typography
        variant='h6'
        fontWeight={600}
        letterSpacing={1}
        align='left'
        my={3}     
      >
        Mentors
      </Typography>
      <Box sx={{height:'520px', overflow:'auto'}}>
        <MentorListLoaded isLoading={mentors === null} mentors={mentors}/>
      </Box>
    </Container>
  </Box>
  )
}
