import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import SignUpForm from '../components/SignUpForm'
import { FirebaseContext } from '../components/Firebase';

class Signup extends Component {

  handleClick = e => {
    e.preventDefault();
    this.props.firebase
    .doCreateUserWithEmailAndPassword(this.state.email, this.state.password).then(()=> {
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.state.nickname,
      })
      firebase.database().ref().child('nicknames').push({
        nickname: this.state.nickname,
        email: this.state.email,
      })
      this.props.history.push('/');
    }
    ).catch((error)=> {
      let {code, message} = error;
      this.setState({ message, code });
});
  };
  componentDidMount() {
    if(this.props.authUser) this.props.history.push('/')
  }
  render() {
    console.log(this.props.authUser);
    return (
      <div className="App">
      <h1>Sign Up</h1>
      <FirebaseContext.Consumer>
       {firebase => <SignUpForm firebase={firebase} />}
      </FirebaseContext.Consumer>
      </div>
    );
  }
}
export default Signup;
