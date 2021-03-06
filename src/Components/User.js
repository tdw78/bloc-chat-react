//User
import React, { Component } from 'react';

class User extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
   });
  }

  handleSignIn(e) {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  handleSignOut(e){
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <div>
        <br></br>
        <button style={{color: "#FFEAD0", backgroundColor: "#37505C" }}  onClick={ (e) => this.handleSignIn(e) }>Sign-In</button>
        <button style={{color: "#FFEAD0", backgroundColor: "#37505C" }} onClick={ (e) => this.handleSignOut(e) }>Sign-Out</button>
        <h3>Active User: {this.props.currentUser? this.props.currentUser.displayName : "Guest" } </h3>
     </div>
    )
  }
}


export default User;
