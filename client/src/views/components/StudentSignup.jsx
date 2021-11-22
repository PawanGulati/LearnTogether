import React from 'react'

import { Button, Container, TextField, Typography } from '@mui/material';

export default function StudentSignup({handleSignUp, handleInputChange, inputs, error}) {
    return (
        <Container component="form" noValidate onSubmit={null} sx={{ mt: 1 }}>
            {error ? 
                <Typography 
                color={"red"}
                variant='subtitle2' 
                style={{width:'100%', textAlign:'center', fontWeight:'bold'}}
                >{error}
                </Typography>
                : null
            }
            <TextField
                value={inputs.name}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Full Name"
                id="fullname"
                autoFocus
            />
            <TextField
                value={inputs.institute}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
                name="institute"
                label="School/ College"
                id="institute"
            />
            <TextField
                value={inputs.email}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            <TextField
                value={inputs.password}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <TextField
                value={inputs.conform_password}
                onChange={handleInputChange}
                margin="normal"
                required
                fullWidth
                name="conform_password"
                label="Confirm Password"
                type="password"
                id="conform_password"
                autoComplete="conform_password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={e => handleSignUp(e, 'student')}
            >
                Sign Up
            </Button>
        </Container>
    )
}
