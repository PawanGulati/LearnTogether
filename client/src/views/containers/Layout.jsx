import Box from '@mui/material/Box'
import React from 'react'
import Header from '../components/Header'

export default function Layout(props) {


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header/>
                {props.children}
                {/* footer*/}
            </Box>
        </>
    )
}