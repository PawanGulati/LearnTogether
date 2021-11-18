import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';

import BackGround from '../../constants/images/gradient_back.jpg'
import Logo from '../components/Logo';
import LoginPage from './LoginPage';
import HomeThemedButton from '../components/HomeThemedButton';
import SignupModal from '../components/SignupModal';
import { auth_fail, set_cur_user } from '../../store/user-store/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectUserError } from '../../store/user-store/user-selectors';

const theme = createTheme();

const mapStateToProps = createStructuredSelector({
  auth_error: selectUserError
})

const mapDispatchToProps = dispatch => ({
  set_cur_user: user => dispatch(set_cur_user(user)),
  auth_fail: error => dispatch(auth_fail(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function SignInSide(props) {
  const [text, setText] = React.useState("student");

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = (t) => {setOpen(true); setText(t)}
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <div style={{
        }}/>
        <Grid
          item
          xs={false}
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
                    width:'100%',
                }}>
                <Typography fontFamily="Proxima Nova Alt"
                    variant="h2"
                    color="#fff"
                    lineHeight="72px"
                    fontWeight="900"
                >You’ll never study alone again</Typography>
                <Typography fontFamily="Proxima Nova Alt" color="#fff" mt={3} mb={7} fontSize={18}>
                    Join the <strong>largest global student community</strong> online and say goodbye to lack of motivation
                </Typography>

                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <HomeThemedButton text="mentor" handleOpen={()=>handleOpen("mentor")}/>
                    <HomeThemedButton text="student" handleOpen={()=>handleOpen("student")}/>
                </div>
                  <SignupModal open={open} handleClose={handleClose} text={text}/>
            </div>
        </Grid>
        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
            <LoginPage 
              {...props}
            />
        </Grid>
      </Grid>
      {/* <Redirect to='/' /> */}
    </ThemeProvider>
  );
})