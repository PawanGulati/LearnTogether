import React from 'react'

import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';

export default function MessageListItem() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align="left" primary="Hi students! any doubts??"></ListItemText>
            </Grid>
            <Grid item xs={12} >
                <ListItemText align="left" secondary="mentor - 09:30"></ListItemText>
            </Grid>
        </Grid>
    )
}
