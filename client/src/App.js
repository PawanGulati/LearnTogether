import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import HomePage from './views/containers/HomePage';
import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';
import StudentHomeView from './views/components/student-views/StudentHomeView';

function App(props) {
  let {pathname} = useLocation()

  let user = null;

  return (
    <div className="App">
      <Layout user={user}>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/' exact component={user ? StudentHomeView : HomePage} />
          <Route path='/404' component={NotFound} />
          <Redirect to='/404' />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
