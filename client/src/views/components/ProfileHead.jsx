import React from 'react'

import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import BackGround from '../../constants/images/profile_background.webp'
import SocialLinks from './SocialLinks'
// import { FormCheckBasicFields, validateForm, validFormCheckInit } from '../../utils/FormValidators/formValidator'

export default function ProfileHead(props) {
    const {
        institute,
        social_links,
        followers,
        following
    } = props.user

    // const INPUT_INIT_STATE = {
    //     name: props.name, 
    //     institute,
    //     linkedin: social_links.linkedin,
    //     facebook: social_links.facebook,
    //     github: social_links.github,
    //     twitter: social_links.twitter
    // }
    // 
    // const [inputs, setInputs] = React.useState(INPUT_INIT_STATE)
    
    // const [errors, setErrors] = React.useState(INPUT_INIT_STATE)

    // const [loginErr, setLoginErr] = React.useState('')
    // const [regErr, setRegErr] = React.useState('')
    
    // const handleInputChange = ({ target: { name, value } }) => {
    //     const inputErrors = FormCheckBasicFields(errors, value, name, inputs)

    //     setErrors({
    //         ...errors,
    //         ...inputErrors
    //     })

    //     setInputs({
    //         ...inputs,
    //         [name]: value
    //     })
    // }

    // const handleUpdateProfile = async e =>{
    //     e.preventDefault()
        
    //     try {
    //         const {
    //         linkedin,
    //         facebook,
    //         github,
    //         twitter,
    //         ...compolsuryInputs
    //         } = inputs

    //         // validation checking
    //         if(!validFormCheckInit(compolsuryInputs) || !validateForm(errors)){
    //             throw new Error('Invalid Form')
    //         }

    //         // API call
    //         const check = await props.set_cur_user({
    //             ...api_inputs,
    //             api_type: `register-${user_type}`
    //         })

    //         window.location.reload()
    //     } catch (error) {
    //     setRegErr(error.message)
    //     }
    // }


    return (
        <>
            <Box sx={{
                width:'100%',
                height:'150px',
                backgroundImage: `url(${BackGround})`,
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                
            }}/>
            <Grid container pt={2} spacing={2} >
                <Grid item sm={12} md={3} sx={{display:'flex', justifyContent: 'center'}}>
                    <Avatar sx={{ width: 150, height: 130 }} variant='rounded' />
                </Grid>
                <Grid 
                    item 
                    sm={12} 
                    md={4} 
                    sx={{
                        display:'flex', 
                        justifyContent:'flex-end', 
                        alignItems:'flex-start', 
                        flexDirection: 'column',
                    }}
                >
                    <Typography align='left' variant='h6' fontWeight={600} sx={{textTransform: 'capitalize'}}>{props.name}</Typography>
                    <Typography align='left' variant='subtitle1' color='text.secondary' sx={{textTransform: 'capitalize'}}>{institute}</Typography>
                    {/* <Typography align='left' variant='subtitle1' color='text.secondary'>something in bio comes here</Typography> */}
                    <SocialLinks links={social_links} />
                </Grid>
                <Grid item sm={12} md={5} sx={{display:'flex', alignItems:'flex-end', flex:2}}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <Button
                                aria-label='edit-profile'
                                variant='contained'
                                fullWidth
                            >Edit Profile</Button>
                        </Grid>
                        <Grid item display='flex' justifyContent='space-evenly' >
                            <Typography color='text.secondary'>12 Bookings</Typography>
                            <Typography color='text.secondary'>{following} Following</Typography>
                            <Typography color='text.secondary'>{followers} Followers</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
