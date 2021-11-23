import { Avatar, Button, Grid, Link, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import BackGround from '../../constants/images/profile_background.jpg'

export default function ProfileHead(props) {
    const {
        institute,
        social_links:{
            linkedin,
            facebook,
            github,
            twitter   
        }
    } = props.user

    return (
        <>
            <Box sx={{
                width:'100%',
                height:'70%',
                backgroundImage: `url(${BackGround})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }} />
            <Avatar sx={{ width: 90, height: 90, top: -52 }} />
            <Grid container>
                <Grid item sm={12} md={6}>
                    <Typography align='left' variant='h6' fontWeight={600} sx={{textTransform: 'capitalize'}}>{props.name}</Typography>
                    <Typography align='left' variant='subtitle1' color='text.secondary' sx={{textTransform: 'capitalize'}}>{institute}</Typography>
                    {/* <Typography align='left' variant='subtitle1' color='text.secondary'>something in bio comes here</Typography> */}
                    <Stack direction='row' spacing={1} mt={1}>
                        <Link href={`https://${linkedin}`} target='_blank'>
                            <LinkedInIcon sx={{color:'var(--linkedin)'}}/>
                        </Link>
                        <Link href={`https://${twitter}`} target='_blank'>
                            <TwitterIcon sx={{color:'var(--twitter)'}}/>
                        </Link>
                        <Link href={`https://${github}`} target='_blank'>
                            <GitHubIcon sx={{color:'#000'}}/>
                        </Link>
                        <Link href={`https://${facebook}`} target='_blank'>
                            <FacebookIcon />
                        </Link>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <Button
                                variant='contained'
                                fullWidth
                            >Edit Profile</Button>
                        </Grid>
                        <Grid item display='flex' justifyContent='space-evenly' >
                            <Typography color='text.secondary'>12 Bookings</Typography>
                            <Typography color='text.secondary'>12 Following</Typography>
                            <Typography color='text.secondary'>12 Followers</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
