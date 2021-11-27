import React from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import DescriptionIcon from '@mui/icons-material/Description';

export default function NotesTabView() {
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' height='100%' alignItems='center'>
            <Typography
                variant='h3'
                color='text.secondary'
            >
                No Notes Available
            </Typography>
            <DescriptionIcon sx={{color:'text.secondary'}} fontSize='large' />
        </Box>
    )
}
