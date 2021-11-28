import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';


export default function MentorSignup({handleSignUp, handleInputChange, inputs, error}) {
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
            <Box sx={{
                display:'flex', 
                width:'100%', 
                justifyContent:"space-between", 
                flexDirection:{xs:'column', md: 'row'}
            }} >
                <Box style={{display:'flex', flexDirection:"column", flex:1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Full Name"
                        id="name"
                        helperText='(at least 5 letters long)'
                        value={inputs.name}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <TextField
                        value={inputs.institute}
                        onChange={handleInputChange}
                        margin="normal"
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
                        helperText='(one uppercase, one lowercase, one special char, one digit) Ex: Pass@121'
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
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem style={{margin:'0px 14px'}}/>
                <Box style={{flex:1}}>
                    <Typography 
                        align='center'
                        fontStyle='italic'
                        color='text.secondary'
                        mb={2}
                    >
                        Let's Socializeee!!
                    </Typography>
                    <TextField
                        value={inputs.linkedin}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        id="linkedin"
                        label="LinkedIN"
                        name="linkedin"
                        InputProps={{
                            startAdornment:<LinkedInIcon style={{color:'var(--linkedin)'}}/>
                        }}
                    />
                    <TextField
                        value={inputs.twitter}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        id="twitter"
                        label="Twitter"
                        name="twitter"
                        InputProps={{
                            startAdornment:<TwitterIcon style={{color:'var(--twitter)'}}/>
                        }}
                    />
                    <TextField
                        value={inputs.facebook}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        id="facebook"
                        label="FaceBook(MEtA)"
                        name="facebook"
                        InputProps={{
                            startAdornment:<FacebookIcon color='primary'/>
                        }}
                    />
                    <TextField
                        value={inputs.github}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        id="github"
                        label="GitHUB"
                        name="github"
                        InputProps={{
                            startAdornment:<GitHubIcon/>
                        }}
                    />
                </Box>
            </Box>
            <Button
                aria-label='mentor-signup'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={e => handleSignUp(e, 'mentor')}
            >
                Sign Up
            </Button>
        </Container>
    )
}
