//RoomList
import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: "",
      newName: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     })
   }

   handleChange(e) {
     this.setState({ newRoom: e.target.value })
   }

    createRoom(e) {
     e.preventDefault();
     const newRoomList = this.roomsRef.push({
       name: this.state.newRoom
     });
     this.setState({ newRoom: newRoomList, newRoom: "" });
   }

  render() {
    return(
      <div>
        <section className= "rooms">
        <h3>Please select a room:</h3>
        <h3>Current Room: {this.props.activeRoom.name}</h3>
         {
           this.state.rooms.map( (room, index) =>
              <div key={index} onClick={ (e) => this.props.setActiveRoom(room)} >{room.name}
                <button onClick={ (e) => this.deleteRoom(room)}>Delete</button>
              </div>
         )}
       </section>
     </div>
   );
  }
}

export default RoomList;
