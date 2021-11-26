import React from 'react'

import Paper from '@mui/material/Paper'

export default function RoundedPaper(props) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: {md: props.height, xs: '100%'},
                borderRadius: 5,
                // height:'100%',
                width:'100%',
                ...props.extraStyles
            }}
        >
            {props.children}
        </Paper>
    )
}
