import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MentorListItem from '../mentor-views/MentorListItem'
import SearchBar from '../SearchBar'

export default function StudentMentorsView() {
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
        <SearchBar />
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
          <Grid container spacing={2}>
            {
              [...new Array(9)].map(_=>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <MentorListItem />
                </Grid>
              )
            }
          </Grid>
        </Box>
      </Container>
    </Box>
    )
}
