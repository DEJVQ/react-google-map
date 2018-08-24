import React, { Component } from 'react';

class Navigation extends Component {
    state = {
        zoom: 15,
        maptype: 'roadmap',
        results: [],
        searchLocation: {lat:  54.0813087, lng: 15.0157938 },
        map: "",
        service: "",
        marker: "",
        markers: []
    };
    

    // Map initialization
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
          type: ["establishment"]
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
          self.setState({marker: marker});
          self.setState({markers: [...self.state.markers, ...[self.state.marker]]});

        window.google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(`<strong>${place.name}</strong> <br> ${place.vicinity}`);
          infowindow.open(self.state.map, this);
        });
      }
        
        this.setState({
            service: service
          })
  }
    
    // Make this on Map move
    handleMove = () => {
        
        var NewMapCenter = this.state.map.getCenter();
        var latitude = NewMapCenter.lat();
        var longitude = NewMapCenter.lng();
        
        infowindow = new window.google.maps.InfoWindow();
        
        this.setState({
            searchLocation: {lat: latitude, lng: longitude}
        });
        
        for(let i = 0; i < this.state.markers.length; i ++) {
            this.state.markers[i].setMap(null)
        }
        
        // Nearby Search
        var resultArray = [];
        var self = this;
        var infowindow;
        
        // Search for hotels
        this.state.service.nearbySearch({
          location: this.state.searchLocation,
          radius: 800,
          type: ["establishment"]
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
            self.state.marker = new window.google.maps.Marker({
              map: self.state.map,
              position: place.geometry.location
            });
               
            // Add markers to marker array of states
            self.setState({markers: [...self.state.markers, ...[self.state.marker]]});

              if(self.state.markers.length > 20) {
                    for(let i = 0; i < self.state.markers.length-10; i++) {
                        self.state.markers[i].setMap(null)
                    }
              }

            // Fire event open infowindow on click certain marker
            window.google.maps.event.addListener(self.state.marker, 'click', function() {
              infowindow.setContent(`<strong>${place.name}</strong> <br> ${place.vicinity}`);
              infowindow.open(self.state.map, this);
            });
        }        
    }
    
    // Set clicked Marker on Map
    setMarkeronMap(result) {
        console.log(result);
        
        for(let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null)
            this.setState({
                markers: []
            });
        }
        let marker = new window.google.maps.Marker({
                map: this.state.map,
                position: result.geometry.location
            })
        
        this.setState({marker: marker});        
        this.setState({markers: [...this.state.markers, ...[this.state.marker]]});

        var infowindow = new window.google.maps.InfoWindow();
        
        
        // This is repeated in 3 functions / Set Infowindow to certain marker
        window.google.maps.event.addListener(this.state.marker, 'click', function() {
            console.log(result);
            console.log(this.state.map);
          infowindow.setContent(`<strong>${result.name}</strong> <br> ${result.vicinity}`);
          infowindow.open(this.state.map, this);
        });
    }


  render() {
      let { onUpdateMap, resultsFiltered} = this.props;
      
      return (
        <div id='app'>
            <div id='map' onChange={(resultArray) => onUpdateMap(resultArray)} onTouchEnd={() => this.handleMove()} onDragStart={this.handleMove} draggable/>
        </div>
    );
  }
}

export default Navigation;
