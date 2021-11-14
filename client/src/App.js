import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';
import HomePage from './views/containers/HomePage';
import LandingPage from './views/containers/LandingPage'

function App(props) {
  let {pathname} = useLocation()

  let user = true;

  return (
    <div className="App">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/404' component={NotFound} />
          <Route path='' render={
            (props)=>{
              return user ? (
                <Layout>
                  <HomePage {...props}/>
                </Layout>
              ): <LandingPage />
            }}
          />
          <Redirect to='/404' />
        </Switch>
    </div>
  );
}

export default App;
