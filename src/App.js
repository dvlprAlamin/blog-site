import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import PostDetails from './components/PostDetails/PostDetails';
import Users from './components/Users/Users';
const App = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/Profile'>Profile</Link>
        <Link to='/users'>Users</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
        <Route path="/post/:id" component={PostDetails} />
      </Switch>
    </Router>
  );
};

export default App;