import React from 'react'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import ChatIcon from '@mui/icons-material/Chat';
import VideocamIcon from '@mui/icons-material/Videocam';
import GroupIcon from '@mui/icons-material/Group';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { NavLink } from 'react-router-dom'
import {withRouter} from 'react-router-dom'

export default withRouter(function RoomTabs(props) {
  const pathname = props.match.path

  return (
    <Grid 
      container 
      display='flex'
      flexDirection='column'
      alignItems='center' 
      justifyContent='center'
      height='50%' 
      width='100%'
      rowSpacing={3}
      margin={0}
    >
      <Grid xs={2} item height='100%' maxWidth='100%' width='100%'>
            <NavLink to={`${pathname}`}>
              <IconButton sx={{height:'100%', width:'100%'}} disableRipple>
                <Tooltip placement='left-start' title='Rooms'>
                  <GroupIcon />              
                </Tooltip>
              </IconButton>
            </NavLink>
      </Grid>
      <Grid xs={2} item height='100%' maxWidth='100%' width='100%'>
            <NavLink to={`${pathname}/chat`}>
              <IconButton sx={{height:'100%', width:'100%'}} disableRipple>
                <Tooltip placement='left-start' title='Chats'>
                  <ChatIcon />              
                </Tooltip>
              </IconButton>
            </NavLink>
      </Grid>
      <Grid xs={2} item height='100%' maxWidth='100%' width='100%'>
            <NavLink to={`${pathname}/notes`}>
              <IconButton sx={{height:'100%', width:'100%'}} disableRipple>
                <Tooltip placement='left-start' title='Notes'>
                  <ListAltIcon />              
                </Tooltip>
              </IconButton>
            </NavLink>
      </Grid>
      <Grid xs={2} item height='100%' maxWidth='100%' width='100%'>
            <NavLink to={`${pathname}/attachments`}>
              <IconButton sx={{height:'100%', width:'100%'}} disableRipple>
                <Tooltip placement='left-start' title='Attachments'>
                  <AttachmentIcon />              
                </Tooltip>
              </IconButton>
            </NavLink>
      </Grid>
      <Grid xs={2} item height='100%' maxWidth='100%' width='100%'>
            <NavLink to={`${pathname}/meet`}>
              <IconButton sx={{height:'100%', width:'100%'}} disableRipple>
                <Tooltip placement='left-start' title='Meet'>
                  <VideocamIcon />              
                </Tooltip>
              </IconButton>
            </NavLink>
      </Grid>
    </Grid>
  )
})

