import React from 'react'

import Grid from '@mui/material/Grid'

import DemandEventListItem from './DemandEventListItem'

export default function DemandedEventList(props) {
    return (
        <Grid container spacing={2}>
            {
              props.events.map((event, idx)=>
                <Grid item key={idx} lg={3} md={4} sm={6} xs={12}>
                  <DemandEventListItem data={event} handleOpenPrompt={ props.handleOpenPrompt } />
                </Grid>
              )
            }
        </Grid>
    )
}
