import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import HomePage from './views/containers/LandingPage';
import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';
import StudentHomeView from './views/components/student-views/StudentHomeView';

function App(props) {
  let {pathname} = useLocation()

  let user = true;

  return (
    <div className="App">
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/' exact render={
            ()=> 
              <Layout user={user}>
                {
                  user ? <StudentHomeView/> : <HomePage />
                }
              </Layout>
            }
          />
          <Route path='/404' component={NotFound} />
          <Redirect to='/404' />
        </Switch>
    </div>
  );
}

export default App;
