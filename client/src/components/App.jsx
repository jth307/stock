
import Nav from './Landing/Nav';
import Landing from './Landing/Landing';
import LoginForm from './Landing/LoginForm';
import Portfolio from './Portfolio';
import SignUp from './Landing/SignUp';
import FreeStocks from './Landing/FreeStocks';
import About from './Landing/About';
import {ProtectedRoute} from '../protectedRoute';
import React, { useState } from 'react';
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
          <ProtectedRoute path="/portfolio"
            component = {Portfolio}
          />
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/free">
            <FreeStocks />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}