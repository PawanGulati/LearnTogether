import React from 'react'

import { Button, Container, TextField } from '@mui/material';

export default function MentorSignup() {
    return (
        <Container component="form" noValidate onSubmit={null} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                name="fullname"
                label="Full Name"
                id="fullname"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="institute"
                label="School/ College"
                id="institute"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            <TextField
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
                margin="normal"
                required
                fullWidth
                name="conform-password"
                label="Confirm Password"
                type="password"
                id="conform-password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
        </Container>
    )
}
