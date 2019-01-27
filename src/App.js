import React, { Component } from 'react';
import 'env2'
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChatRoom from './pages/ChatRoom';
import User from './pages/User';
import NotFound from './pages/NotFound';
import { Route, NavLink, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

const config = {
  apiKey: "AIzaSyAglyqBZw-q0q9msDClwH7p8yAtO1yK3nw",
  authDomain: "react-hooks-c5630.firebaseapp.com",
  databaseURL: "https://react-hooks-c5630.firebaseio.com",
  projectId: "react-hooks-c5630",
  storageBucket: "react-hooks-c5630.appspot.com",
  messagingSenderId: process.env.SENDER_ID
};
firebase.initializeApp(config);

class App extends Component {

  constructor(){
    super();
    this.state = {
      loggedin:false,
      username:""
    };

  }
  componentDidMount(){
     this.listener = firebase.auth().onAuthStateChanged((user)=> {
      user
       ? this.setState({ loggedin:true, username: user.displayName })
       : this.setState({ loggedin: false });
    });
  }
  componentWillUnmount() {
    this.listener();
  }

  logOut=()=>{
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      // this.props.history.push('/login')
      console.log('Sign-out successful.')
      }).catch(function(error) {
      // An error happened.
    });
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.loggedin
          ? <ChatRoom username={this.state.username}/>
          : <Redirect  to="/login" />
      )} />
)
    return (
      <Router>
        <div className="App">
        <ul>
      <li>
        <NavLink exact to="/" activeClassName="active">Home</NavLink>
      </li>
      {!this.state.loggedin ?
        <div>
      <li>
        <NavLink to="/login" activeClassName="active">Log in</NavLink>
      </li>
      <li>
      <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
      </li>
      </div>:
      <li>
        <NavLink onClick={()=> this.logOut()} to="/" >Sign Out</NavLink>
      </li>}
    </ul>
    <Switch>
    <Route path="/login" component={Login} />
    <PrivateRoute path='/' exact component={ChatRoom} />
      <Route path="/signup" component={Signup} />
      <Route path="/users/:id" component={User} />
      <Route component={NotFound} />

    </Switch>
        </div>
      </Router>
    );
  }
}
export default (App);
