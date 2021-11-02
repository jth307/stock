import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Route, Link, useHistory, Redirect } from 'react-router-dom';




ReactDOM.render(<Landing/>, document.getElementById('app'));
