import React from 'react'

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import MessageList from '../message-views/MessageList';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurRoom } from '../../../store/room-store/room-selectors';

const mapStateToProps = createStructuredSelector({
    room: selectCurRoom
})

export default connect(mapStateToProps)(function Room(props) {

    const [messages, setMessages] = React.useState([])
    const [message, setMessage] = React.useState('')

    const handleInputChange = ({ target: { value } }) =>{
        setMessage(value)
    }

    React.useEffect(()=>{
        // setMessage(props.room.messages)
    },[props.room])

    return (
        <Grid item xs={9}>
            <MessageList messages={messages} />
            <Divider />
            <Grid container style={{padding: '20px'}}>
                <Grid item xs={11}>
                    <TextField 
                        id="outlined-basic-email" 
                        label="Type Something" 
                        fullWidth 
                        value={message}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </Grid>
    )
})
