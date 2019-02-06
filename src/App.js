//App
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';
import MessageList from './Components/MessageList';
import User from './Components/User';

var config = {
  apiKey: "AIzaSyB-ujG5PJJIkbLDIdaINNsXEU_a-Gkos3M",
  authDomain: "bloc-chat-abf35.firebaseapp.com",
  databaseURL: "https://bloc-chat-abf35.firebaseio.com",
  projectId: "bloc-chat-abf35",
  storageBucket: "bloc-chat-abf35.appspot.com",
  messagingSenderId: "352609805270"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomId: "",
      username: "",
      currentUser: ""
    }
  }

  setActiveRoom = room => {
    this.setState({ activeRoom: room});
    this.setState({ activeRoomId: room.key});
    this.setState({ username: room.username});
    }

    setUser(user) {
      this.setState({ currentUser: user })
    }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome to<br /> Bloc Chat</h1>
        </header>
        <main>
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
            isActiveRoom={this.state.isActiveRoom}
            activeRoomId={this.state.activeRoomId}
            setUser={this.setUSer}
          />
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            username={this.state.username}
            setUser={this.setUSer}
          />
          <User
            firebase={firebase}
            username={this.state.username}
            setUser={this.setUSer}
            currentUser={this.state.currentUser}
          />
       </main>
     </div>
    );
  }
}

export default App;
