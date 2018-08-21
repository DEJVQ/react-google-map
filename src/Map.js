import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>dsadsadas</div>;

class Navigation extends Component {
    state = {
        zoom: 12,
        maptype: 'roadmap',
        place_formatted: '',
        place_id: '',
        place_location: '',
        results: []
        
    }
    
    
    componentDidMount() {
        var map;
        var infowindow;
        var mapHotel = {lat:  54.0813087, lng: 15.0157938 };
        var resultArray = [];

        map = new window.google.maps.Map(document.getElementById('map'), {
          center: mapHotel,
          zoom: 15
        });

        infowindow = new window.google.maps.InfoWindow();
        var service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: mapHotel,
          radius: 800,
          type: ['hotel']
        }, callback);

      function callback(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
              resultArray.push(results[i]);
          }
        }
      }
        console.log(resultArray);
        this.setState({
            results: resultArray
        })
        console.log(this.state.results)

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new window.google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        window.google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }    
  }

  render() {
    return (
        <div id='app'>
        <div id='map' />
      </div>
    );
  }
}

export default Navigation;
