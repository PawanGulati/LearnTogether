import React from 'react'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import AttachmentIcon from '@mui/icons-material/Attachment';

export default function AttachmentsTabView() {
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' height='100%' alignItems='center'>
            <Typography
                variant='h3'
                color='text.secondary'
            >
                No Attachments Available
            </Typography>
            <AttachmentIcon sx={{color:'text.secondary'}} fontSize='large' />
        </Box>
    )
}
