import { Container } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function MentorRoomsView() {
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
            </Container>
        </Box>
    )
}
