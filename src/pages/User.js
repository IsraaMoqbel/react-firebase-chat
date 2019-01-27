import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    const { params } = this.props.match
    return (
      <div className="App">
        <h1>User details will be here </h1>
        <p>{params.id}</p>
      </div>
    );
  }
}
export default NotFound;
