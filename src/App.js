import React, { Component } from 'react';
import './App.css';
//import GoogleMapReact from 'google-map-react';

/* Components */
import Navigation from "../src/Navigation";
import Sidebar from "../src/Sidebar";
import Map from "../src/Map";


class App extends Component {
    state = {
        results: [],
        open: false,
        query: "",
    };

    // Create reference / to run function inside Map
    child = React.createRef();

    // Toggle class for navigation menu
    toggleClass() {
        let currentState = this.state.open;
        this.setState({ open: !currentState });
    };

    // Assing markers to state results
    loadMarkers = results => {
        this.setState({
            results: results
        });
    };


    // Filter Map by given query in search box
    updateQuery = query => {
        var self = this;
        this.setState({ query: query.trim() });
        if(query !== "") {
            var filterResults = this.state.results.filter(function(place){
                if (self.state.query !== "") {
                    return place.name.match(self.state.query);
                }
            });
        }
        
        if(typeof filterResults !== "undefined" && filterResults.length > 0) {
            this.setState({
                results: filterResults
            });   
        }
    }
    
    // Get clicked element and set on map one Marker
    setOnMap = result => {
        var clickedResult = result.getAttribute("id");
        
//        console.log(this.state.results);
//        console.log(this.state.clickedResult);
        
        for (let i = 1; i < this.state.results.length; i++) {
            if(this.state.results[i].id === clickedResult) {
                this.child.current.setMarkeronMap(this.state.results[i]);
            }
        }
    }
    
  render() {
      let { open, results, searchQuery, query } = this.state;
      
    return (
      <div id="container">

        {/* Navigation component */}
        <Navigation onToggleClass={() => this.toggleClass()} />
            
         {/* Map component */}
         <Map onUpdateMap={(resultArray) => this.loadMarkers(resultArray)} ref={this.child} resultsFiltered={results} />
            
        {/* Sidebar component */}
        <Sidebar open={open} onToggleClass={() => this.toggleClass()} results={results} onUpdateQuery={(event) => this.updateQuery(event)} query={query} onSetOnMap={(result) => this.setOnMap(result)}/>
            
      </div>
    );
  }
}

export default App;
