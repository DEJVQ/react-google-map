import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>dsadsadas</div>;

class Navigation extends Component {
    state = {
        center: {
          lat: 54.083,
          lng: 15.017
        },
        zoom: 11,
        open: false
    };

  render() {
      let { center, zoom } = this.state;
      
    return (
          <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyDCEb-qOyBpw5tc0YxlU_ERp9Ac_xqzFk0" }}
              defaultCenter={center}
              defaultZoom={zoom} >

            </GoogleMapReact>
        
    );
  }
}

export default Navigation;
