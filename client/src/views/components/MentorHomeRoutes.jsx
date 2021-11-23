import React from 'react'

import withSpinner from '../../hoc/withSpinner/withSpinner'
import MentorHomeView from '../components/mentor-views/MentorHomeView'
import MentorEventView from '../components/mentor-views/MentorEventView'
import MentorRoomsView from '../components/mentor-views/MentorRoomsView'
import { Redirect, Route, Switch } from 'react-router'
import MentorProfile from './mentor-views/MentorProfile'
import { createStructuredSelector } from 'reselect'
import { selectCurMentor, selectMentorLoading } from '../../store/mentor-store/mentor-selectors'
import { connect } from 'react-redux'
import { selectCurUser } from '../../store/user-store/user-selectors'

const MentorHomeViewLoaded = withSpinner(MentorHomeView)
const MentorEventViewLoaded = withSpinner(MentorEventView)
const MentorRoomsViewLoaded = withSpinner(MentorRoomsView)
const MentorProfileLoaded = withSpinner(MentorProfile)

const mapStateToProps = createStructuredSelector({
    mentor_loading: selectMentorLoading,
    cur_mentor: selectCurMentor,
    cur_user: selectCurUser
})

export default connect(mapStateToProps)(function MentorHomeRoutes(props) {
    const pathname = props.match.path
    
    return (
        <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
            <Route 
                exact 
                path={`${pathname}`} 
                render={
                    ()=> 
                    <MentorHomeViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}profile`} 
                render={
                    ()=> 
                    <MentorProfileLoaded 
                        isLoading={props.mentor_loading || props.isLoading} 
                        cur_mentor={props.cur_mentor}
                        cur_user={props.cur_user}
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}events`} 
                render={
                    ()=> 
                    <MentorEventViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Route 
                exact 
                path={`${pathname}rooms`} 
                render={
                    ()=> 
                    <MentorRoomsViewLoaded 
                        isLoading={props.isLoading} 
                    /> 
                } 
            />
            <Redirect to='/404' />
        </Switch>
    )
})
