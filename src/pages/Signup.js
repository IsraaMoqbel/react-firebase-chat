import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      nickname: "",
      email: "",
      password: "",
      code:"",
      message: ""
    };
  }
  handleNameChange = e => this.setState({ nickname: e.target.value });
  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });
  handleClick = e => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=> {
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
  render() {
    const isInvalid =
      this.state.password === '' ||
      this.state.email === '';
    return (
      <div className="App">
          <div className="joinForm">
            <h1>Sign up</h1>
            {(this.state.message)? <div >{this.state.code}:<br/>{this.state.message}</div> : null}
            <div  className="tooltip">
            <input placeholder="Nickname" value={this.state.nickname} onChange={this.handleNameChange}/><br />
            <span className="tooltiptext">Enter a nickname</span>
            </div>
            <div  className="tooltip">
            <input placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} type="email" autoComplete="on"/><br />
            <span className="tooltiptext" style={{top:'150px'}}>Enter a valid E-mail</span>
            </div>
            <div  className="tooltip">
            <input placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} type="password"/><br />
            <span className="tooltiptext" style={{top:'210px'}}>at least 6 characters</span>
            </div>
            <button onClick={this.handleClick} disabled={isInvalid}>Join</button>
          </div>
      </div>
    );
  }
}
export default Signup;
