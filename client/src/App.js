import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';
import HomePage from './views/containers/HomePage';
import LandingPage from './views/containers/LandingPage'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCurUser, selectUserLoading} from './store/user-store/user-selectors'
import {store} from './store'
import {setToken} from './utils/services/api'
import { auth_fail, auth_success, logout, set_user_fromID } from './store/user-store/user-actions';
import { set_cur_student_async } from './store/student-store/student-actions';

import withSpinner from './hoc/withSpinner/withSpinner'
import { set_cur_mentor_async } from './store/mentor-store/mentor-actions';
import { selectStudentLoading } from './store/student-store/student-selectors';
import { selectMentorLoading } from './store/mentor-store/mentor-selectors';

// Checking if token is valid(not expired also comes init) and there in local storage, then set a user else logout or not set a user
//TODO: BUGFIX: auto logout without a refresh
const setUserFromToken = async () =>{
  if(localStorage.jwtToken){
    try {
      const timer = JSON.parse(localStorage.getItem('timer'));
      
      if (timer && ((Date.now() / 1000) > timer)) {
        store.dispatch(logout()) 
        window.location.href = '/signin'

      }else{
        setToken(localStorage.jwtToken)
        // const {_id} = jwtDecode(localStorage.jwtToken)
        
        await store.dispatch(set_user_fromID())
      }
    } catch (error) {
      store.dispatch(auth_success(null))
      store.dispatch(auth_fail(error))
    }
  }
}

setUserFromToken()

function HomeRoute(props){
  return (
   
    <Route path='' render={
      (innerProps)=>{
        return props.current_user ? (
          <Layout>
            <HomePage 
              isLoading={props.loading} 
              set_cur_student={props.set_cur_student}
              set_cur_mentor={props.set_cur_mentor}
              current_user={props.current_user}
              {...innerProps}
            />
          </Layout>
        ): <LandingPage />
      }}
    />
  )
}

const HomeRouteLoaded = withSpinner(HomeRoute)

function App(props) {
  let {pathname} = useLocation()
  
  return (
    <div className="App">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/404' component={NotFound} />
          <HomeRouteLoaded {...props} loading={props.isLoading} isLoading={props.isLoading} />
          <Redirect to='/404' />
        </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  current_user: selectCurUser,
  isLoading: selectUserLoading,
})

const mapDispatchToProps = dispatch =>({
  set_cur_student: () => dispatch(set_cur_student_async()),
  set_cur_mentor: () => dispatch(set_cur_mentor_async())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
