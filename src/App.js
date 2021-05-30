import React from 'react';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Profile from './components/Home/Profile/Profile';
const App = () => {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/Profile'>Profile</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;