import React from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { validFormCheckInit } from '../../utils/FormValidators/formValidator';

function Copyright(props) {
  return (
    <Typography fontFamily="Proxima Nova Alt" variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#" >
        Learn Together
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LoginPage(props) {

  // INPUT STATE
  const [inputs, setInputs] = React.useState({email:'',password:''})
  const handleInputChange = ({ target: { name, value } }) => {
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSignIn = async e =>{
    e.preventDefault()
    
    try {
        // validation checking
        if(!validFormCheckInit(inputs)){
            throw new Error('Invalid Form')
        }

        // API call 
        const check = await props.set_cur_user({...inputs, api_type: 'login'})

        if(check){
            //redirection
            props.history.push('/')

            // form initial state returned
            setInputs({email:'',password:''})
        }
    } catch (error) {
      props.setLoginErr(error.message)
    }
  }
  
  return (
    <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily:"Proxima Nova Alt"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography fontFamily="Proxima Nova Alt" component="h1" variant="h5">
          Sign in
        </Typography>
        {props.error ? 
            <Typography
            color={"red"}
            variant='subtitle2' 
            style={{width:'100%', textAlign:'center', fontWeight:'bold'}}
            >{props.error}
            </Typography>
            : null
        }
        <Box component="form" onSubmit={e => handleSignIn(e)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            aria-label='signin'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent='center'>
            <Grid item xs={6}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    )
}
