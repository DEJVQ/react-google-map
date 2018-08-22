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
        open: false
    };


    componentDidMount() {
        console.log();
    }

conso


    toggleClass() {
        let currentState = this.state.open;
        this.setState({ open: !currentState });
    };

    loadMarkers = results => {
        this.setState({
            results: results
        });
    };
    
  render() {
      let { open, results } = this.state;
      
    return (
      <div id="container">

        {/* Navigation component */}
        <Navigation onToggleClass={() => this.toggleClass()} />
            
         {/* Map component */}
         <Map onUpdateMap={(resultArray) => this.loadMarkers(resultArray)} />
            
        {/* Sidebar component */}
        <Sidebar open={open} onToggleClass={() => this.toggleClass()} results={results}/>
            
      </div>
    );
  }
}

export default App;
