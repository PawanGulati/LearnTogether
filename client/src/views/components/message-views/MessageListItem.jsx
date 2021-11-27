import React from 'react'

import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';

export default function MessageListItem(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align={(props.id%2)?'left':'right'} primary="Hi students! any doubts??"></ListItemText>
            </Grid>
            <Grid item xs={12} >
                <ListItemText align={(props.id%2)?'left':'right'} secondary="mentor - 09:30"></ListItemText>
            </Grid>
        </Grid>
    )
}
