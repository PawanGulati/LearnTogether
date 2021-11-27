import React, { Component } from 'react'

import {store} from '../../store'
import {auth_message} from '../../store/user-store/user-actions'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

class ErrorBoundary extends Component {
    constructor(){
        super()

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error){
        return { hasErrored: true };
    }
    
    componentDidCatch(error, info){
        store.dispatch(auth_message(error?.message, 'error', true))
    }

    render() {
        if(this.state.hasErrored){
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 8}} textAl>
                        <Typography
                            variant='h3'
                            color='text.secondary'
                        >
                            Something Went Wrong
                        </Typography>   
                    </Container>
                </Box>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary