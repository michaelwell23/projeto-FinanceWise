import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppProvider from './hooks';
import Login from './Pages/SignIn';
import Register from './Pages/SignUp';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router>
      <Switch>
        <AppProvider>
          <Route path='/signin' component={Login} />
          <Route path='/signup' component={Register} />
        </AppProvider>
      </Switch>

      <GlobalStyle />
    </Router>
  );
}

export default App;
