import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ToastProvider } from './hooks/toast';
import { AuthProvider } from './hooks/auth';

import Login from './Pages/SignIn';
import CreateAccount from './Pages/CreateAccount';
import Dashboard from './Pages/Dashboard';

import GlobalStyle from './styles/global';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Switch>
            <Route path='/signin' component={Login} />
            <Route path='/signup' component={CreateAccount} />
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
          <GlobalStyle />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
