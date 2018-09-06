import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListView extends Component {
  static propTypes = {
    beaches: PropTypes.array.isRequired
  }

  render() {
    const { beaches } = this.props
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
