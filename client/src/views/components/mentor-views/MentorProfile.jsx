import { Container, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ProfileHead from '../ProfileHead'
import ProfileNavBar from '../ProfileNavBar'
import MentorProfileTabs from '../MentorProfileTabs'

import RoundedPaper from '../RoundedPaper'
import { createStructuredSelector } from 'reselect'
import { selectCurMentor } from '../../../store/mentor-store/mentor-selectors'
import { selectCurUser } from '../../../store/user-store/user-selectors'
import { connect } from 'react-redux'

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
                        <MentorProfileTabs />
                    </RoundedPaper>               
                </Stack>
            </Container>
        </Box>
    )
}
