import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { user } from './app/gameSlice';
import { LoginPage, GamePage, ScoreBoardPage, NotFoundPage } from './pages';

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useSelector(user);

  if (!auth) return <Redirect to={{ pathname: '/login' }} />;

  return <Route {...rest} />;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={GamePage} />
        <PrivateRoute path="/score-board" component={ScoreBoardPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
