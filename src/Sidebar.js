import React, { Component } from 'react';


class Sidebar extends Component {
    
  render() {
      let { onToggleClass, results, onUpdateQuery, query } = this.props;

      console.log(results)
      
      
      
    return (
        <div className={this.props.open ? "sidebar" : "sidebar sidebar--close"}>
            <i className="fa fa-times sidebar__icon" onClick={() => onToggleClass()} ></i>
            <h3 className="sidebar__header">React locations</h3>

            <input type="text" className="sidebar__search" value={query} onChange={(event) => onUpdateQuery(event.target.value)} placeholder="Search for location"/>

            <div className="sidebar__results">
                <ol className="sidebar__list">
                    {results.map((result) => (
                        <li key={result.id} className="sidebar__result">
                            <p>Hotel name: <span>{result.name}</span></p>
                            <p>Address: <span>{result.vicinity}</span></p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
  }
}

export default Sidebar;
