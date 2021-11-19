import React from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import StudentHomeView from '../components/student-views/StudentHomeView'
import StudentEventView from '../components/student-views/StudentEventView'
import StudentRoomView from '../components/student-views/StudentRoomView'
import StudentMentorsView from '../components/student-views/StudentMentorsView'

import withSpinner from '../../hoc/withSpinner/withSpinner'
const StudentHomeViewLoaded = withSpinner(StudentHomeView)
const StudentEventViewLoaded = withSpinner(StudentEventView)
const StudentMentorViewLoaded = withSpinner(StudentMentorsView)
const StudentRoomViewLoaded = withSpinner(StudentRoomView)


export default function HomePage(props) {
    const pathname = props.match.path;

    React.useEffect(() => {
        props.set_cur_student()
    }, [])

    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route exact path={`${pathname}`} render={()=> <StudentHomeViewLoaded isLoading={props.isLoading} /> } />
            <Route exact path={`${pathname}events`} render={()=> <StudentEventViewLoaded isLoading={props.isLoading} /> } />
            <Route exact path={`${pathname}mentors`} render={()=> <StudentMentorViewLoaded isLoading={props.isLoading} /> } />
            <Route exact path={`${pathname}rooms`} render={()=> <StudentRoomViewLoaded isLoading={props.isLoading} /> } />
            <Redirect to='/404' />
        </Switch>
    )
}
