import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './Components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Welcome to<br /> Bloc Chat Room</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;
