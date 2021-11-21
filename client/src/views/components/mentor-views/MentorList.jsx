import { Grid } from '@mui/material'
import React from 'react'
import MentorListItem from './MentorListItem'

export default function MentorList(props) {
    return (
        <Grid container spacing={2}>
            {
              props.mentors.map((mentor, idx)=>
                <Grid item key={idx} lg={3} md={4} sm={6} xs={12}>
                  <MentorListItem data={mentor} />
                </Grid>
              )
            }
        </Grid>
    )
}
