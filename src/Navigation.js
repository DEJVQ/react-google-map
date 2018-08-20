import React, { Component } from 'react';


class Navigation extends Component {
    
  render() {
      let { onToggleClass } = this.props;
      
    return (
        <div className="navigation">
                <i className="fa fa-bars navigation__icon" onClick={() => onToggleClass()}></i>
        </div>
    );
  }
}

export default Navigation;
