import React from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import StudentHomeView from '../components/student-views/StudentHomeView'
import StudentEventView from '../components/student-views/StudentEventView'
import StudentRoomView from '../components/student-views/StudentRoomView'
import StudentMentorsView from '../components/student-views/StudentMentorsView'

export default function HomePage(props) {
    const pathname = props.match.path;

    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path={`${pathname}`} component={ StudentHomeView } />
            <Route exact path={`${pathname}events`} component={ StudentEventView } />
            <Route exact path={`${pathname}mentors`} component={ StudentMentorsView } />
            <Route exact path={`${pathname}rooms`} component={ StudentRoomView } />
            <Redirect to='/404' />
        </Switch>
    )
}
