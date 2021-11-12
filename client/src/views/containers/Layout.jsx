import Box from '@mui/material/Box'
import React from 'react'
import Header from '../components/Header'
import HeaderDrawer from '../components/Header-Drawer'

export default function Layout(props) {
    return (
        <Box display="flex" justifyContent="center" height="100%" width="100%">
            {props.user ? <HeaderDrawer /> : <Header />}
            {props.children}
            {/* footer*/}
        </Box>
    )
}