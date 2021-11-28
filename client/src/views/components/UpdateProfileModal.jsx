import React from 'react'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

export default function UpdateProfileModal({handleUpdateProfile, handleInputChange, inputs, error}) {
    return (
        <Container component="form" noValidate onSubmit={handleUpdateProfile} sx={{ mt: 1 }}>
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
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="name"
                label="Full Name"
                id="fullname"
                helperText='(at least 5 letters long)'
                autoFocus
            />
            <TextField
                value={inputs.institute}
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="institute"
                label="School/ College"
                id="institute"
            />
            <TextField
                value={inputs.linkedin}
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="linkedin"
                label="Linkedin URL"
                id="linkedin"
            />
            <TextField
                value={inputs.github}
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="github"
                label="Github URL"
                id="github"
            />
            <TextField
                value={inputs.facebook}
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="facebook"
                label="Facebook URL"
                id="facebook"
            />
            <TextField
                value={inputs.twitter}
                onChange={ handleInputChange }
                margin="normal"
                required
                fullWidth
                name="twitter"
                label="Twitter URL"
                id="twitter"
            />
            <Button
                aria-label='profile-update'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Update My Info
            </Button>
        </Container>
    )
}
