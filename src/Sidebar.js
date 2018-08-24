import React, { Component } from 'react';


class Sidebar extends Component {
    
  render() {
      let { onToggleClass, results, onUpdateQuery, query, onSetOnMap} = this.props;
      
    return (
        <div className={this.props.open ? "sidebar" : "sidebar sidebar--close"}>
            <i className="fa fa-times sidebar__icon" onClick={() => onToggleClass()} ></i>
            <h3 className="sidebar__header">Rest location</h3>

            <input type="text" className="sidebar__search" value={query} onChange={(event) => onUpdateQuery(event.target.value)} placeholder="Search for location" aria-valuenow={query}/>

            <div className="sidebar__results">
                <ol className="sidebar__list">
                    {results.map((result) => (
                        <li key={result.id} className="sidebar__result" id={result.id} onClick={(result) => onSetOnMap(result.target)}>
                            <p id={result.id}>Hotel name: <span>{result.name}</span></p>
                            <p id={result.id}>Address: <span>{result.vicinity}</span></p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
  }
}

export default Sidebar;
