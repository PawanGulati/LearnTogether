import { Paper } from '@mui/material'
import React from 'react'

export default function RoundedPaper(props) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: {lg: props.height, xs: '100%'},
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
