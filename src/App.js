import React, { Component } from 'react';
import './App.css';
//import GoogleMapReact from 'google-map-react';

/* Components */
import Navigation from "../src/Navigation";
import Sidebar from "../src/Sidebar";
import Map from "../src/Map";

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
    state = {
//        center: {
//          lat: 54.083,
//          lng: 15.017
//        },
//        zoom: 11,
        open: false
    };



    toggleClass() {
        let currentState = this.state.open;
        this.setState({ open: !currentState });
    };
    
  render() {
      let { open } = this.state;
      
    return (
      <div id="container">
        {/* Navigation component */}
           <Navigation onToggleClass={() => this.toggleClass()} />
            
         {/* Map component */}
           <Map />
            
        {/* Sidebar component */}
        <Sidebar open={open} onToggleClass={() => this.toggleClass()}/>
            
      </div>
    );
  }
}

export default App;
