import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList './components/RoomList';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
