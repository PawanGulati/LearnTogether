import React from 'react'

import Grid from '@mui/material/Grid'

import MentorListItem from './MentorListItem'

export default function MentorList(props) {
    return (
        <Grid container spacing={4}>
            {
              props.mentors.map((mentor, idx)=>
                <Grid item key={idx} lg={3} md={4} sm={6} xs={12}>
                  <MentorListItem 
                    data={mentor} 
                    handleClickOpen={props.handleClickOpen}
                  />
                </Grid>
              )
            }
        </Grid>
    )
}
