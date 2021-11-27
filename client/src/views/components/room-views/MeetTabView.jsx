import React from 'react'

import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PeopleIcon from '@mui/icons-material/People';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export default function MeetTabView() {
    React.useEffect(() => {
        let video = document.querySelector("video");

        if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
        }
    }, [])

    return (
        <Grid container direction='column' height='100%'>
            <Grid item xs={1}>
                <Stack direction='row' spacing={4} height='100%' alignItems='center'>
                    <Stack direction='row' alignItems='center'>
                        <PeopleIcon sx={{color:'text.secondary'}} fontSize='small' />
                        <Typography
                            variant='subtitle2'
                            align='left'
                            p={1}
                            color='text.secondary'
                        >
                            Invited to call 
                        </Typography>
                        <Chip label="3" size='small' color='success' sx={{opacity:.7}} />
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <BookmarkRemoveIcon sx={{color:'text.secondary'}} fontSize='small' />
                        <Typography
                            variant='subtitle2'
                            align='left'
                            p={1}
                            color='text.secondary'
                        >
                            Absent people
                        </Typography>
                        <Chip label="2" size='small' color='error' sx={{opacity:.7}} />
                    </Stack>
                </Stack>
            </Grid>
            <Divider variant='middle' />
            <Grid item xs={9} p={2} >
                <video height='100%' width='100%' autoPlay={true} style={{borderRadius:10, backgroundColor:'#666'}} />
            </Grid>
        </Grid>
    )
}
