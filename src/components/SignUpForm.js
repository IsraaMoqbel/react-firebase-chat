import React, { Component } from 'react';
import { withFirebase } from '../components/Firebase';
import { withRouter } from 'react-router-dom';



const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class SignUpForm extends Component {
  constructor() {
    super();
        this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
  const { username, email, passwordOne } = this.state;
  this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      this.setState({ ...INITIAL_STATE });
      this.props.history.push('/');

    })
    .catch(error => {
      this.setState({ error });
    });

  event.preventDefault();
};


  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
     passwordOne !== passwordTwo ||
     passwordOne === '' ||
     email === '' ||
     username === '';

    return (
      <form onSubmit={this.onSubmit}>
      {error && <p>{error.message}</p>}
        <div  className="tooltip">
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <span className="tooltiptext">Enter a nickname</span>
        </div>
        <div className="tooltip">
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <span className="tooltiptext" style={{top:'150px'}}>Enter a valid E-mail</span>
        </div>
        <div className="tooltip">

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <span className="tooltiptext" style={{top:'210px'}}>at least 6 characters</span>
        </div>
        <div className="tooltip">

        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        </div>

        <button type="submit" disabled={isInvalid}>Sign Up</button>

      </form>
    );
  }
}

export default withRouter(withFirebase(SignUpForm))
