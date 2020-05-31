//RoomList
import React, { Component } from 'react';

const buttonStyle = {
  paddingBottom: 11,
  paddingRight: 11,
  paddingLeft: 11,
  width: 9,
  height: 9,
}

const buttonText = {
  fontSize: 9,
  textAlign: "middle"
}

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
     const newRoomList = this.roomsRef.push({
       name: this.state.newRoom
     });
     this.setState({ newRoom: newRoomList, newRoom: "" });
   }

     deleteRoom(roomName) {
       this.roomsRef.child(roomName.key).remove();
       const newRooms = [];
       this.state.rooms.map((room,index) => {
         if (room.key != roomName.key){
           newRooms.push(room);
         }
       });
       this.setState({rooms:newRooms});
     }

  render() {
    const styles = {
      color: "#0D2023",
      fontFamily: "Georgia",
      fontSize: 20,
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 16,
      paddingLeft: 16,
      marginRight: '2rem'
    }
 
    return(
      <div>
        <section className= "rooms">
        <h3 style={styles}>Please select a room:</h3>
        <h3 style={styles}>Current Room: {this.props.activeRoom.name}</h3>
         {
           this.state.rooms.map( (room, index) =>
             <div class="row">
               <div class="col-lg-5"></div>
               <div class="col-lg-2" style={styles} key={index} onClick={(e) => this.props.setActiveRoom(room)}> 
                 {room.name}
               </div>
               <div class="cole-lg-2">
                 <button class="btn btn-danger" onClick={ (e) => this.deleteRoom(room)} style={buttonStyle, buttonText}>X</button>
               </div>
               <div class="col-lg-3"></div>
             </div>
         )}      
         <br></br>
         <br></br>
           <form onSubmit={ e => { e.preventDefault(); 
             this.createRoom(this.state.newRoom);
             }}>
            <div class="form-group">   
              <input
                type = "text"
                value = {this.state.newRoom}
                onChange = { (e) => this.handleChange(e) } />
             <input 
             style={{color: "#FFEAD0", backgroundColor: "#37505C" }}
             type="submit" value="Create a New Room"/>
            </div>
         </form>
         
       </section>
     </div>
   );
  }
}

export default RoomList;
