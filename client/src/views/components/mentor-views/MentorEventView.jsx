import React from 'react'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import { book_event, set_all_events } from '../../../utils/services/events'
import SearchBar from '../SearchBar'

import withSpinner from '../../../hoc/withSpinner/withSpinner'
import DemandedEventList from '../event-views/DemandedEventList'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterMoment';
import moment from 'moment'
import SnackBar from '../../../utils/NotificationPopUp/SnackBar'

const EventListLoaded = withSpinner(DemandedEventList)

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MentorEventView() {
    const [events, setEvents] = React.useState(null)

    React.useEffect(()=>{
        let mounted = true

        set_all_events(false).then(events => {
        if(mounted) setEvents(events)
        })

        return () => mounted = false
    },[])

    // Dialog State
    const [openPropmt, setOpenPropmt] = React.useState(false);
    const [cur_event, set_cur_event] = React.useState(null)
    const [date, setDate] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
        setDate(newValue);
    };

    const handleOpenPrompt = (event) => {
        setOpenPropmt(true);
        set_cur_event(event);
    };

    const handleClosePrompt = () => {
        setOpenPropmt(false);
    };

    const handleSubmit = () =>{
        if(cur_event)
            book_event({eventID: cur_event._id, data: {date: moment(date).format('MM/DD/YYYY')}})

        setOpenPropmt(false);
        // reload()
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
                <SearchBar placeholder='Search Events' />
                <Typography
                    variant='h6'
                    fontWeight={600}
                    letterSpacing={1}
                    align='left'
                    my={3}     
                >
                    Requested Events
                </Typography>
                <Box>
                    <EventListLoaded isLoading={events === null} events={events} handleOpenPrompt={handleOpenPrompt} />
                </Box>
            </Container>
            {cur_event &&
                <Dialog
                open={openPropmt}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClosePrompt}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{ 
                    "Do you like to book this EVENT ?"
                }</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Box sx={{
                                display: 'flex',
                                width:'100%', 
                                height: '100%',
                                overflow:'hidden', 
                                whiteSpace: 'nowrap',
                            }}>
                            {
                                cur_event['topics'].map((topic, id)=>
                                <Typography key={id} sx={{textTransform: 'capitalize'}}>
                                    {topic + (id === cur_event['topics'].length-1 ? '': ', ')}
                                </Typography>
                                )
                            }
                            </Box>
                        </DialogContentText>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="DD/MM/YYYY"
                                value={date}
                                onChange={handleChangeDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button aria-label='book-no' onClick={handleClosePrompt} color='error'>No</Button>
                    <Button aria-label='book-yes' onClick={ handleSubmit }>Yes</Button>
                </DialogActions>
            </Dialog>}
            <SnackBar />
        </Box>
    )
}
