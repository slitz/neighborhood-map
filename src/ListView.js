import React, { Component } from 'react';

class ListView extends Component {
  render() {
    return (
      <div className="search">
        <div className="search-bar">
          <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search"
              />
          </div>
        </div>
      </div>
    );
  }
}

export default ListView;
