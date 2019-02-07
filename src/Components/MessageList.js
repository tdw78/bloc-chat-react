//MessageList
import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      newMessage: ""
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
      })
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value})
  }

  createMessage(message){
      this.messagesRef.push({
        roomId: this.props.activeRoomId,
        user: this.props.currentUser? this.props.currentUser.displayName : "Guest",
        content: this.state.newMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      });
      this.setState({
        newMessage:''
      });
    }

   render(){
       const activeList = this.state.messages.filter(message =>
         message.roomId === this.props.activeRoomId
        )

         const messages = activeList.map( (message, index) =>
           <div key={index}>
             <li>{message.content}</li>
             <li> User:{this.props.currentUser? this.props.currentUser.displayName : "Guest"}</li>
             <li> Sent:{message.sentAt} </li>
          </div>
          )

     return(
       <div>
          {
          messages
         }
         <form
             onSubmit={ e => {
             e.preventDefault();
             this.createMessage(this.state.newMessage);
             }}>
             <input
             type = "text"
             value = {this.state.newMessage}
             onChange = { (e) => this.handleChange(e) }/>
             <input type = "submit" value="Type a Message"/>
             </form>
      </div>
    )}
 }


export default MessageList;
