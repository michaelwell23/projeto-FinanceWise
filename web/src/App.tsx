import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth/AuthContext';
import PrivateRoute from './Routes/AuthRoutes';
import Login from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import Dashboard from './Pages/Dashboard';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/signin' component={Login} />
          <Route path='/create-account' component={CreateAccount} />

          <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>

        <GlobalStyle />
      </AuthProvider>
    </Router>
  );
}

export default App;
