import React, { Component } from 'react';
import './ChatRoom.css';
import firebase from 'firebase/app';
import 'firebase/database';

class ChatRoom extends Component {
  static defaultProps = {
    username:''
  }
  constructor() {
    super();
    this.state = {
      joined: false,
      msg: "",
      messages: {},
    };
    this.chatRoom = firebase.database().ref().child('chatrooms').child('global');

    this.handleNewMessages = snap => {
      console.log(snap.val());
      // if not null then update state
      if (snap.val()) this.setState({ messages: snap.val() });
    };
  }
  componentDidMount() {
    // (this.props.authUser) ? this.chatRoom.on('value', this.handleNewMessages): this.props.history.push('/login')
    this.chatRoom.on('value', this.handleNewMessages)
  }
  componentWillUnmount() {
    this.chatRoom.off('value', this.handleNewMessages);
  }

  handleMsgChange = e => this.setState({ msg: e.target.value });
  handleKeyDown = e => {
    if (e.key === "Enter") {
      // send the msg
      this.chatRoom.push({
        sender: this.props.username,
        msg: this.state.msg,
      });
      // clear the field
      this.setState({ msg: "" });
    }
  };

  render() {
    console.log(this.props)
    return (
      <div className="App">
          <div className="chat">
            <div className="messages">
              {Object.keys(this.state.messages).map((message,index) => {
                  return (
                    <div className={this.state.messages[message]["sender"] === this.props.username ? "message-orange": "message"} key={index}>
                      <span id={this.state.messages[message]["sender"] === this.props.username ? "me": "sender" }>{this.state.messages[message]["sender"]}</span><br />
                      {this.state.messages[message]["msg"]}
                    </div>
                  );
              })}
            </div>
            <input className="enter-message-input" placeholder="msg" onChange={this.handleMsgChange} onKeyDown={this.handleKeyDown} value={this.state.msg} /><br />

          </div>
      </div>
    );
  }
}
export default (ChatRoom);
