
import Nav from './Nav';
import Landing from './Landing';
import LoginForm from './LoginForm';
import Portfolio from './portfolio';
import SignUp from './SignUp';


import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}