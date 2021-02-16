import React,{Component} from 'react';
import { geolocated } from "react-geolocated";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class App extends Component {

  static  mapStyles = {
    width: '100%',
    height: '100%'
   };
   static options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
  constructor(props){
    super(props);
    this.state ={
      coords:{
        lat:null,
        lng:null
      },
      restList: null,
      errMessage: null
    }
  }
  setCoordinates(pos) {
  var crd = pos.coords;
  const coords ={
    lat : crd.latitude,
    lng : crd.longitude
  }
  this.getNearestRestaurants(coords)
  this.setState({coords: coords})
}

setErrorMessage(err) {
  this.setState({errMessage:`ERROR(${err.code}): ${err.message}`})
}

getNearestRestaurants(coords) {
  fetch('/api/restaurants/'+coords.lat+'/'+coords.lng)
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ restList: data })
        })
        .catch(console.log)
      }

  
 componentDidMount() {
  const that = this;
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result)
          if (result.state === "granted") {

            navigator.geolocation.getCurrentPosition(that.setCoordinates.bind(that));
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(that.setCoordinates.bind(that), that.setErrorMessage.bind(that), that.options);
          } else if (result.state === "denied") {
            that.setState({errMessage:"Browser not supporting to read location, please enable it"})
          }
          result.onchange = function () {
            //console.log(result.state);
          };
        });
    } else {
     that.setState({errMessage:"Browser not supporting to read location, please enable it"})
    }
  }

render(){
 return <>
 <h1>Hello User</h1>
 {
  this.state.errMessage &&
   <p>{this.state.errMessage}</p>
 }
   {(this.state.coords && this.state.coords.lat && this.state.coords.lng) &&
 
  <Map
        google={this.props.google}
        zoom={14}
        style={this.mapStyles}
        initialCenter={
          {
            lat: this.state.coords.lat,
            lng: this.state.coords.lng
          }
        }
      >
      {this.state.restList && this.state.restList.map((list) => (
<Marker
    title={list.name}
    name={list.name}
    position={{lat: list.lat, lng: list.lng}} />
  ))}
  
      </Map>  }
       {(!this.state.coords.lat || !this.state.coords.lng) &&
      <p>Loading.... </p>
    }
     </> 
     
 

}
}

export default (
  GoogleApiWrapper({apiKey: 'add your key'})
 )
(App);


