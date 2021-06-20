// import logo from './logo.svg';
import './App.css';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/pages/Navbar';
import {Offline, Online} from 'react-detect-offline'
import LandingPage from './components/pages/LandingPage';
import React, { Component }  from 'react';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Notes from './components/pages/Notes';
import Reminders from './components/pages/Reminders';
import ToDoLists from './components/pages/ToDoLists';
import Account from './components/pages/Account';
import Logout from './components/pages/Logout';
import ChangePassword from './components/pages/ChangePassword';
import Profile from './components/pages/Profile'
import { MdCloudOff } from "react-icons/md";

class App extends Component {
  render(){
    
  return (
    <Router>
      <div>
        <Online>
        <Switch>
          <Route exact path="/">
            <LandingPage></LandingPage>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/notes">
            <Notes></Notes>
          </Route>
          <Route exact path="/reminders">
            <Reminders></Reminders>
          </Route>
          <Route exact path="/todolists">
            <ToDoLists></ToDoLists>
          </Route>
          <Route exact path="/logout">
            <Logout></Logout>
          </Route>
          <Route exact path="/profile">
            <Profile></Profile>
          </Route>
          <Route exact path="/changePassword">
            <ChangePassword></ChangePassword>
          </Route>
          
        </Switch>
        </Online>
        <Offline>
          <div className="nonet" style={{textAlign:'center',  marginTop:'100px'}}>
            <MdCloudOff style={{ fontSize:'100px'}}/>
            <h1>No Connection</h1>
            <p>Make sure you have proper connection!</p>
            <button>Try again</button>
          </div>
        </Offline>
      </div>
    </Router>
  );
  }
}

export default App;
