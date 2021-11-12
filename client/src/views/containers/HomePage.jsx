import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import BackGround from '../../constants/images/gradient_back.jpg'
import Logo from '../components/Logo';
import LoginPage from './LoginPage';

const theme = createTheme();

export default function SignInSide() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
        email: data.get('email'),
        password: data.get('password'),
        });
    };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div style={{
        }}/>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackGround})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <Logo color="#fff"/>
            <div 
                style={{
                    position:'relative', 
                    zIndex:10, 
                    paddingTop:"200px",
                    height: '100%', 
                    width:'100%',
                }}>
                    <Typography fontFamily="Proxima Nova Alt"
                        variant="h2"
                        color="#fff"
                        // fontSize="68px"
                        lineHeight="72px"
                        fontWeight="900"
                    >You’ll never study alone again</Typography>
                    <Typography fontFamily="Proxima Nova Alt" color="#fff" mt={3} fontSize={18}>
                        Join the <strong>largest global student community</strong> online and say goodbye to lack of motivation
                    </Typography>
            </div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <LoginPage handleSubmit={handleSubmit}/>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}