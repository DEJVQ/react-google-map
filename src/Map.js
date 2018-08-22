import React, { Component } from 'react';

class Navigation extends Component {
    state = {
        zoom: 15,
        maptype: 'roadmap',
        place_formatted: '',
        place_id: '',
        place_location: '',
        results: [],
        maplongtitude: 54.0813087,
        maplattitude: 15.0157938,
        searchLocation: {lat:  54.0813087, lng: 15.0157938 },
        map: "",
        service: ""
    };
    
    componentDidMount() {
        
        var self = this;
        var map
        this.map = map;
        var infowindow;
        var mapHotel = {lat:  54.0813087, lng: 15.0157938 };
        var resultArray = [];



        map = new window.google.maps.Map(document.getElementById('map'), {
          center: this.state.searchLocation,
          zoom: this.state.zoom
        });
        
        this.setState({
            map: map
          })
        
        infowindow = new window.google.maps.InfoWindow();

        let service = new window.google.maps.places.PlacesService(map);
        
        
        service.nearbySearch({
          location: this.state.searchLocation,
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

//        map.setCenter(new window.google.maps.LatLng(54.0813087, 15.0257938));
        
        
        this.setState({
            service: service
          })
//        var NewMapCenter = map.getCenter();
//        var latitude = NewMapCenter.lat();
//        var longitude = NewMapCenter.lng();
        
  }

    handleMove = () => {
//        this.state.map.setCenter(new window.google.maps.LatLng(54.0813087, 15.0257938));
        
        var NewMapCenter = this.state.map.getCenter();
        var latitude = NewMapCenter.lat();
        var longitude = NewMapCenter.lng();
        
        console.log(latitude + " , " + longitude);
        
        this.setState({
            searchLocation: {lat: latitude, lng: longitude}
        });
        
        console.log(this.state.searchLocation);
        
        
        // Nearby Search
        
        
        var resultArray = [];
        var self = this;
        var infowindow;
        
        this.state.service.nearbySearch({
                  location: this.state.searchLocation,
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
                  map: self.state.map,
                  position: place.geometry.location
                });

                window.google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent(place.name);
                  infowindow.open(this.state.map, this);
                });
              }
        
        
        
        
        
    }


  render() {
      let { onUpdateMap} = this.props;
      
//      console.log(this.state.map)
//      console.log(this.state.service)

      return (
        <div id='app'>
            <div id='map' onChange={(resultArray) => onUpdateMap(resultArray)} onTouchEnd={() => this.handleMove()} onMouseUp={this.handleMove} />
        </div>
    );
  }
}

export default Navigation;
