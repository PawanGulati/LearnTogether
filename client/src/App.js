import './App.css';

import {Switch, Route, useLocation, Redirect} from 'react-router-dom'

import HomePage from './views/containers/HomePage';
import LoginPage from './views/containers/LoginPage';
import RegisterPage from './views/containers/RegisterPage';
import NotFound from './views/containers/NotFound';
import Layout from './views/containers/Layout';

function App() {
  let {pathname} = useLocation()

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
          <Route path='/' exact component={HomePage} />
          <Route path='/signin' exact component={LoginPage} />
          <Route path='/signup' exact component={RegisterPage} />
          <Route path='/404' component={NotFound} />
          <Redirect to='/404' />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
