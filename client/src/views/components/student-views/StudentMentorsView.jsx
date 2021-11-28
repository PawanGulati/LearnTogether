import React from 'react'

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import SearchBar from '../SearchBar'
import MentorList from '../mentor-views/MentorList'
import SnackBar from '../../../utils/NotificationPopUp/SnackBar'

import { set_mentors } from '../../../utils/services/mentors'
import { createStructuredSelector } from 'reselect';
import { selectCurUser } from '../../../store/user-store/user-selectors';
import { connect } from 'react-redux';
import { follow_user_async, unfollow_user_async } from '../../../store/user-store/user-actions';

import withSpinner from '../../../hoc/withSpinner/withSpinner'
const MentorListLoaded = withSpinner(MentorList)


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = createStructuredSelector({
  cur_user: selectCurUser
})

export default connect(mapStateToProps)(function StudentMentorsView(props) {

  const [mentors, setMentors] = React.useState(null)
  const [mentor, setMentor] = React.useState(null)
  const [toFollow, setToFollow] = React.useState(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (mentor, to_follow) => {
    setMentor(mentor);
    setToFollow(to_follow);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    let mounted = true

    set_mentors().then(events => {
      if(mounted) setMentors(events)
    })

    return () => mounted = false
  },[])

  const followMentorHandler = async() =>{
    if(toFollow){
      await props.dispatch(follow_user_async(mentor.user._id, mentor.user.name))
    }else{
      await props.dispatch(unfollow_user_async(mentor.user._id, mentor.user.name))
    }

    setOpen(false)
  }

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 8}}>
      {/* SEARCH BAR */}
      <SearchBar placeholder='Search Mentors' />
      <Typography
        variant='h6'
        fontWeight={600}
        letterSpacing={1}
        align='left'
        my={3}     
      >
        Mentors
      </Typography>
      <Box sx={{height:'520px', overflow:'auto'}}>
        <MentorListLoaded 
          isLoading = {mentors === null} 
          mentors = {mentors}
          handleClickOpen = {handleClickOpen}
        />
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Stack direction='row' spacing={1}>
            <Typography variant='h6'>Do you want to { toFollow ? 'follow' : 'unfollow' }</Typography>
            <Typography variant='h6' sx={{textTransform:'capitalize'}} color='text.secondary' fontWeight={600}>{mentor?.user.name}?</Typography>
          </Stack>
        </DialogTitle>
        <DialogActions>
          <Button aria-label='follow-no' onClick={handleClose} color='error'>No</Button>
          <Button aria-label='follow-yes' onClick={followMentorHandler}>Yes</Button>
        </DialogActions>
      </Dialog>
      <SnackBar />
    </Container>
  </Box>
  )
})
