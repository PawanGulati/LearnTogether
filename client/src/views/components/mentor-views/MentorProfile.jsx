import React from 'react'

import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

import RoundedPaper from '../RoundedPaper'
import ProfileHead from '../ProfileHead'
import ProfileNavBar from '../ProfileNavBar'
import MentorProfileTabs from './MentorProfileTabs'

export default function MentorProfile(props) {
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
                <Stack spacing={2} >
                    <RoundedPaper height={60}>
                        <ProfileNavBar />
                    </RoundedPaper>
                    <RoundedPaper height={320} extraStyles={{padding:3}}>
                        <ProfileHead user={props.cur_mentor} name={props.cur_user.name}/>
                    </RoundedPaper>
                    <RoundedPaper height={320}>
                        <MentorProfileTabs user={props.cur_user}/>
                    </RoundedPaper>               
                </Stack>
            </Container>
        </Box>
    )
}
