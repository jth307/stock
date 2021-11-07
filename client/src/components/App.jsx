
import Nav from './Landing/Nav';
import Landing from './Landing/Landing';
import LoginForm from './Landing/LoginForm';
import Portfolio from './Portfolio';
import SignUp from './Landing/SignUp';
import FreeStocks from './Landing/FreeStocks';
import Landing2 from './Landing/Landing2';
import React from "react";
import {
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
          <Route path="/free">
            <FreeStocks />
          </Route>
          <Route path="/landing2">
            <Landing2 />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}