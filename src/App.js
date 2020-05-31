//App
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      currentUser: "",
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
    const headerStyles = {
      color: "#352B3D",
      fontFamily: "Georgia",
      fontSize: 120,
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 16,
      paddingLeft: 16,
      letterSpacing: 2,
      wordSpacing: 4
    }
    return (
      <div className="App" style={{backgroundColor: "#7EBDC2" }}>
        <header style={headerStyles}>
          <h1>Welcome to Bloc Chat</h1>
        </header>
        <main>
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={this.setActiveRoom}
            activeRoomId={this.state.activeRoomId}
            setUser={this.setUser.bind(this)}
          />
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomId={this.state.activeRoomId}
            username={this.state.username}
            setUser={this.setUser.bind(this)}
            currentUser={this.state.currentUser}
          />
          <User
            firebase={firebase}
            username={this.state.username}
            setUser={this.setUser.bind(this)}
            currentUser={this.state.currentUser}
          />
       </main>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
       <br></br>
     </div>
    );
  }
}

export default App;
