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
import SnackBar from '../../utils/NotificationPopUp/SnackBar'
import { auth_message, set_cur_user } from '../../store/user-store/user-actions';

import {FormCheckBasicFields, validateForm, validEmailRegex, validFormCheckInit, validPasswordRegex} from '../../utils/FormValidators/formValidator'
import { withRouter } from 'react-router';

const theme = createTheme();

const mapDispatchToProps = dispatch => ({
  set_cur_user: user => dispatch(set_cur_user(user)),
  auth_message: (text,popUpType,open) => dispatch(auth_message(text,popUpType,open))
})

export default withRouter(connect(null, mapDispatchToProps)(function SignInSide(props) {
  const [text, setText] = React.useState("student");

  const INPUT_INIT_STATE = {
    email:'',
    password:'',
    conform_password:'',
    name:'', 
    institute: '',
    linkedin: '',
    facebook: '',
    github: '',
    twitter: ''
  }

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = (t) => {setOpen(true); setText(t)}
  const handleClose = () => {
    setOpen(false);

    setRegErr('')

    setInputs(INPUT_INIT_STATE)
    
    setErrors(INPUT_INIT_STATE)
  }

  // REGISTER INPUT STATE
  const [inputs, setInputs] = React.useState(INPUT_INIT_STATE)
  
  const [errors, setErrors] = React.useState(INPUT_INIT_STATE)

  const [loginErr, setLoginErr] = React.useState('')
  const [regErr, setRegErr] = React.useState('')
  
  const handleInputChange = ({ target: { name, value } }) => {
    const inputErrors = FormCheckBasicFields(errors, value, name, inputs)

    setErrors({
        ...errors,
        ...inputErrors
    })

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSignUp = async (e, user_type) =>{
    e.preventDefault()
    
    try {
        const {
          linkedin,
          facebook,
          github,
          twitter,
          ...studentInputs
        } = inputs

        // validation checking
        if(!validFormCheckInit(user_type === 'student' ? studentInputs : inputs) || !validateForm(errors)){
            throw new Error('Invalid Form')
        }

        // API call
        const check = await props.set_cur_user({...inputs, api_type: `register-${user_type}`})

        if(check){
          // form initial state returned
          setInputs(INPUT_INIT_STATE)

          //redirection
          props.history.push('/')
        }
    } catch (error) {
      setRegErr(error.message)
    }
  }

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
                  <SignupModal 
                    open={open} 
                    handleClose={handleClose} 
                    text={text}
                    handleInputChange={handleInputChange}
                    inputs={inputs}
                    handleSignUp={handleSignUp}
                    error={regErr}
                  />
            </div>
        </Grid>
        <Grid item xs={12} md={5} component={Paper} elevation={6} square>
            <LoginPage 
              set_cur_user={props.set_cur_user}
              auth_message={props.auth_message}
              error={loginErr}
              setLoginErr={setLoginErr}
            />
        </Grid>
      </Grid>
      <SnackBar />
      {/* <Redirect to='/' /> */}
    </ThemeProvider>
  );
}))