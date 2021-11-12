import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
    return (
        <>
            <AppBar position="absolute">
                <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Album layout
                </Typography>
                </Toolbar>
            </AppBar>   
        </>
    )
}
