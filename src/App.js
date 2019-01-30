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
import SignOutButton from './components/SignOutButton';
import { withAuthentication, AuthUserContext } from './components/Session';

const NewRoute = ({ component: Component, ...rest }) => (
  <AuthUserContext.Consumer>
  {( authUser ) => (
    <Route
    render={
      props =>
      <Component {...props} authUser={authUser}/>
    }
    {...rest}

    />
  )}
  </AuthUserContext.Consumer>
)
const ProtectedRoute = ({ component: ChatRoom, ...rest }) => (
  <AuthUserContext.Consumer>
    {( authUser ) => (
      <Route
        render={
          props =>
            authUser
            ? <ChatRoom {...props} authUser={authUser}/>
            : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthUserContext.Consumer>
)

class App extends Component {

render(){
console.log(this.props);
  return (
    <Router>
    <div className="App">
    <ul>
    <li>
    <NavLink exact to="/" activeClassName="active">Home</NavLink>
    </li>
      <div>
      <li>
      <NavLink to="/login" activeClassName="active">Log in</NavLink>
      </li>
      <li>
      <NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
      </li>
      </div>
      <li>
      <SignOutButton />
      </li>

    </ul>
    <Switch>
    <NewRoute path="/signup" component={Signup} />
    <ProtectedRoute path="/" exact component={ChatRoom}  />
    <NewRoute path="/login"  component={Login} />
    <Route path="/users/:id" component={User} />
    <Route component={NotFound} />

    </Switch>
    </div>
    </Router>
  );
}
  }

export default withAuthentication(App);
