import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';

import {withRouter} from 'react-router-dom'

export default withRouter(function ListItems(props) {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText onClick={()=>props.history.push('/')} primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText onClick={()=>props.history.push('/events')} primary="Event" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText onClick={()=>props.history.push('/rooms')} primary="Rooms" />
      </ListItem>
      {props.userType === 'student' && <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText onClick={()=>props.history.push('/mentors')} primary="Mentors" />
      </ListItem>}
    </div>
  )
})