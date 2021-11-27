import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import StudentHomeView from './StudentHomeView'
import StudentEventView from './StudentEventView'
import StudentRoomView from './StudentRoomView'
import StudentMentorsView from './StudentMentorsView'
import withSpinner from '../../../hoc/withSpinner/withSpinner'
import StudentProfile from './StudentProfile'
import { createStructuredSelector } from 'reselect'
import { selectCurUser } from '../../../store/user-store/user-selectors'
import { selectCurStudent, selectStudentLoading } from '../../../store/student-store/student-selectors'
import { connect } from 'react-redux'

const StudentHomeViewLoaded = withSpinner(StudentHomeView)
const StudentEventViewLoaded = withSpinner(StudentEventView)
const StudentMentorViewLoaded = withSpinner(StudentMentorsView)
const StudentRoomViewLoaded = withSpinner(StudentRoomView)
const StudentProfileLoaded = withSpinner(StudentProfile)

const mapStateToProps = createStructuredSelector({
    student_loading: selectStudentLoading,
    cur_student: selectCurStudent,
    cur_user: selectCurUser
})

export default connect(mapStateToProps)(function StudentHomeRoutes(props) {
    const pathname = props.match.path

    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route 
                exact 
                path={`${pathname}`} 
                render={
                    ()=> 
                    <StudentHomeViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}profile`} 
                render={
                    ()=> 
                    <StudentProfileLoaded
                        cur_student={props.cur_student}
                        cur_user={props.cur_user}
                        isLoading={props.student_loading || props.isLoading} 
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}events`} 
                render={
                    ()=> 
                    <StudentEventViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}mentors`} 
                render={
                    ()=> 
                    <StudentMentorViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Route 
                path={`${pathname}rooms`} 
                render={
                    ()=> 
                    <StudentRoomViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Redirect to='/404' />
        </Switch>
    )
})
