import React from 'react'

import withSpinner from '../../hoc/withSpinner/withSpinner'
import MentorHomeView from '../components/mentor-views/MentorHomeView'
import MentorEventView from '../components/mentor-views/MentorEventView'
import MentorRoomsView from '../components/mentor-views/MentorRoomsView'
import { Redirect, Route, Switch } from 'react-router'

const MentorHomeViewLoaded = withSpinner(MentorHomeView)
const MentorEventViewLoaded = withSpinner(MentorEventView)
const MentorRoomsViewLoaded = withSpinner(MentorRoomsView)

export default function MentorHomeRoutes(props) {
    const pathname = props.match.path
    
    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path={`${pathname}`} render={()=> <MentorHomeViewLoaded isLoading={props.isLoading} /> } />
            <Route exact path={`${pathname}events`} render={()=> <MentorEventViewLoaded isLoading={props.isLoading} /> } />
            <Route exact path={`${pathname}rooms`} render={()=> <MentorRoomsViewLoaded isLoading={props.isLoading} /> } />    
            <Redirect to='/404' />
        </Switch>
    )
}
