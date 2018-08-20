import React, { Component } from 'react';


class Sidebar extends Component {
    
  render() {
      let { onToggleClass } = this.props;
      
    return (
        <div className={this.props.open ? "sidebar" : "sidebar sidebar--close"}>
                <i className="fa fa-times sidebar__icon" onClick={() => onToggleClass()} ></i>
                <h3 className="sidebar__header">React locations</h3>
                <input type="text" className="sidebar__search" placeholder="Search for location"/>
                <div className="sidebar__results">
                </div>
            </div>
    );
  }
}

export default Sidebar;
