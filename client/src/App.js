import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';
import HomePage from './views/containers/HomePage';
import LandingPage from './views/containers/LandingPage'

import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCurUser} from './store/user-store/user-selectors'

function App(props) {
  let {pathname} = useLocation()
  console.log(props);
  
  return (
    <div className="App">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/404' component={NotFound} />
          <Route path='' render={
            (innerProps)=>{
              return props.current_user ? (
                <Layout>
                  <HomePage {...innerProps}/>
                </Layout>
              ): <LandingPage />
            }}
          />
          <Redirect to='/404' />
        </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  current_user: selectCurUser
})

export default connect(mapStateToProps)(App);
