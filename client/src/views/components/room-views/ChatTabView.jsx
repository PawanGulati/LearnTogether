import React from 'react'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import SendIcon from '@mui/icons-material/Send';
import MessageList from '../message-views/MessageList';

export default function ChatTabView() {
    return (
        <Grid container height='100%' direction='column'>
            <Grid item xs={1} sx={{borderBottom:'1px solid #e0e0e0'}}>
                <Stack direction='row' alignItems='center'>
                    <Typography
                        variant='h6'
                        align='left'
                        p={2}
                        color='text.secondary'
                    >
                        Room 1 -
                    </Typography>
                    <Typography
                        variant={'body1'}
                        align='left'
                        p={2}
                        color='text.disabled'
                    >
                        Topic 1, Topic 2, Topic 3
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={9}>
                <MessageList />
            </Grid>
            <Grid item xs={1} sx={{borderTop:'1px solid #e0e0e0'}}>
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
