import React from 'react'

import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import GroupsTabView from './GroupsTabView'
import ChatTabView from './ChatTabView'
import AttachmentsTabView from './AttachmentsTabView'
import NotesTabView from './NotesTabView'
import MeetTabView from './MeetTabView'

import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function RoomTab(props) {
    const pathname = props.match.path

    return (
        <Grid 
            container
            sx={{
                height: '100%',
                overflow:'auto',
                justifyContent:'center',
                display:'flex'
            }}
        >
            <Grid 
                item xs={10}
                sx={{borderRight:'1px solid #e0e0e0'}}
            >
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path={`${pathname}`} component={GroupsTabView} />
                    <Route exact path={`${pathname}/chat`} component={ChatTabView} />
                    <Route exact path={`${pathname}/notes`} component={NotesTabView} />
                    <Route exact path={`${pathname}/attachments`} component={AttachmentsTabView} />
                    <Route exact path={`${pathname}/meet`} component={MeetTabView}/>
                    <Redirect to='/404' />
                </Switch>
            </Grid>
            <Grid item xs={1.5}>
                <Typography
                    variant='body1'
                    color='text.secondary'
                    my={2.5}
                >
                    Online
                </Typography>
                <Divider />
                <Stack mt={3} spacing={2} alignItems='center'>
                    {
                        [...Array(3)].map((_, id)=>
                        <Badge key={id} color="success" variant="dot">
                            <Avatar>
                                A
                            </Avatar>
                        </Badge>
                    )}
                </Stack>
            </Grid>
        </Grid>
    )
})
