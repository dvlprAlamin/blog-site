import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import PostDetails from './components/PostDetails/PostDetails';
import Users from './components/Users/Users';
import { ContextProvider } from './context';
import UserDetails from './components/UserDetails/UserDetails';
import Navigation from './components/Navigation/Navigation';
const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/users" component={Users} />
          <Route path="/post/:id" component={PostDetails} />
          <Route path="/user/:id" component={UserDetails} />
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;