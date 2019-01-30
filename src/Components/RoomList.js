//RoomList
import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ""
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
         {
           this.state.rooms.map( (room, index) =>
              <div key={index}>{room.name}</div>
         )}
       </section>
       <form onSubmit={ (e) => this.createRoom(e) }>
         <input type="text" value={this.state.newRoom} onChange={ (e) => this.handleChange(e) } />
         <input type="submit" />
       </form>
     </div>
   );
  }
}

export default RoomList;
