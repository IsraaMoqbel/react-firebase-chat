import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      valid:false,
      email: "",
      password: "",
      code:"",
      message: ""
    };
  }
  handleNameChange = e => this.setState({ nickname: e.target.value });
  handleEmailChange = e => this.setState({ email: e.target.value });
  handlePasswordChange = e => this.setState({ password: e.target.value });
  handleClick =async e => {
  await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then( (user)=>{
    user &&
       this.props.history.push('/')
      this.setState({valid:true })
    }
      ).catch((error)=> {
  let {code, message} = error;
  this.setState({ message, code });
  });
  };
  componentDidMount(){
     this.listener = firebase.auth().onAuthStateChanged((user)=> {
      if(user) this.props.history.push('/')
    });
  }
  componentWillUnmount() {
    this.listener();
  }
  render() {
    const isInvalid =
      this.state.password === '' ||
      this.state.email === '';
    return (
      <div className="App">
          <div className="joinForm">
          <h1>Log in</h1>
            {this.state.message && <div >{this.state.code}:<br/>{this.state.message}</div>}
            <input placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} type="email" autoComplete="on"/><br />
            <input placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} type="password" /><br />
            <button onClick={this.handleClick} disabled={isInvalid}>Join</button>
          </div>

      </div>
    );
  }
}
export default Login;
