import React, { Component } from 'react';
import SignInForm from '../components/SignInForm';


class Login extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)

  }
    componentDidMount(){
      this.props.authUser && this.props.history.push('/')
    }
    componentWillUnmount() {
    }
  render() {
    return (
      <div>
      <h1>Log In</h1>
        <SignInForm />
      </div>
    );
  }
}
export default Login;
