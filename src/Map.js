import React, { Component } from 'react';

class Navigation extends Component {
    state = {
        zoom: 12,
        maptype: 'roadmap',
        place_formatted: '',
        place_id: '',
        place_location: '',
        results: []
        
    };
    
    
    componentDidMount() {
        let self = this;
        let map;
        let infowindow;
        let mapHotel = {lat:  54.0813087, lng: 15.0157938 };
        let resultArray = [];



        map = new window.google.maps.Map(document.getElementById('map'), {
          center: mapHotel,
          zoom: 15
        });

        infowindow = new window.google.maps.InfoWindow();

        let service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: mapHotel,
          radius: 800,
          type: ['hotel']
        }, callback);

      function callback(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
              resultArray.push(results[i]);
          }
        }
        self.props.onUpdateMap(resultArray);
      }
      
      this.setState({ results: resultArray });



      function createMarker(place) {
        let placeLoc = place.geometry.location;
        let marker = new window.google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        window.google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }


        var NewMapCenter = map.getCenter();
        var latitude = NewMapCenter.lat();
        var longitude = NewMapCenter.lng();

        console.log(latitude);
  }

    handleMove() {

    }

  render() {
      let { onUpdateMap} = this.props;

      return (
        <div id='app'>
            <div id='map' onChange={(resultArray) => onUpdateMap(resultArray)} onTouchEnd={this.handleMove} onMouseUp={this.handleMove} />
        </div>
    );
  }
}

export default Navigation;
