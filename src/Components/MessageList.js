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

    deleteMessage(clickedMessage) {
      const newMsgList = this.state.messages.filter( msg => {
       return msg !== clickedMessage
     });
      this.setState({ messages: newMsgList });
    }

   render(){
       const activeList = this.state.messages.filter(message =>
         message.roomId === this.props.activeRoomId
        )

         const messages = activeList.map( (message, index) =>
           <div key={index}>
             <div>{message.content}</div>
             <div> User:{message.user}</div>
             <div> Sent:{message.sentAt} </div>
             <button class="btn btn-secondary btn-sm" onClick={ (e) => this.deleteMessage(message)}>Delete</button>
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
             <input 
              style={{color: "#FFEAD0", backgroundColor: "#37505C" }}
             type = "submit" value="Type a Message"/>
             </form>
      </div>
    )}
 }


export default MessageList;
