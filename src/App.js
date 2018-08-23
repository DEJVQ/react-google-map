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
        results: [],
        open: false,
        query: ""
    };


    componentDidMount() {
        console.log();
    }

    toggleClass() {
        let currentState = this.state.open;
        this.setState({ open: !currentState });
    };

    loadMarkers = results => {
        this.setState({
            results: results
        });
    };

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
    
  render() {
      let { open, results, searchQuery, query } = this.state;
      
    return (
      <div id="container">

        {/* Navigation component */}
        <Navigation onToggleClass={() => this.toggleClass()} />
            
         {/* Map component */}
         <Map onUpdateMap={(resultArray) => this.loadMarkers(resultArray)} />
            
        {/* Sidebar component */}
        <Sidebar open={open} onToggleClass={() => this.toggleClass()} results={results} onUpdateQuery={(event) => this.updateQuery(event)} query={query}/>
            
      </div>
    );
  }
}

export default App;
