import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>dsadsadas</div>;

class Navigation extends Component {
    state = {
        zoom: 12,
        maptype: 'roadmap',
    }
    
    
    componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap',
    });
  }

  render() {
    return (
        <div id='app'>
        <div id='state'>
          <h1>State</h1>
          <p>
            Zoom level: {this.state.zoom}<br />
            Map type: {this.state.maptype}
          </p>
        </div>
        <div id='map' />
      </div>
    );
  }
}

export default Navigation;
