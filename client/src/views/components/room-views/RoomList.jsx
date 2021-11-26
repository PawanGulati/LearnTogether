import React from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import { createStructuredSelector } from 'reselect';
import {selectCurRooms} from '../../../store/room-store/room-selectors'
import { connect } from 'react-redux';
import { set_room_async } from '../../../store/room-store/room-actions';

const mapStateToProps = createStructuredSelector({
    rooms_list: selectCurRooms
})

export default connect(mapStateToProps)(function RoomList(props) {
    
    const roomSelectHandler = (roomID) => {
        props.dispatch(set_room_async(roomID))   
    }
    
    return (
        <List>
            {
                props.rooms_list.map((room, idx) => 
                    <ListItem button key={idx} onClick={()=>roomSelectHandler(room._id)}>
                        <ListItemIcon>
                            <Avatar alt={`Room${idx}`} src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Room 1">Room {idx}</ListItemText>
                    </ListItem>
                )
            }
        </List>
    )
})
