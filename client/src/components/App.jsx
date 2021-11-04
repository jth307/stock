
import Nav from './Landing/Nav';
import Landing from './Landing/Landing';
import LoginForm from './Landing/LoginForm';
import Portfolio from './Portfolio';
import SignUp from './Landing/SignUp';




import React from "react";
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
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
    </HashRouter>
  );
}