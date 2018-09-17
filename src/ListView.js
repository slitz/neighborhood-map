import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListView extends Component {
  static propTypes = {
    beaches: PropTypes.array.isRequired,
    filteredBeaches: PropTypes.array.isRequired,
    filterBeaches: PropTypes.func.isRequired,
    // showingInfoWindow: PropTypes.bool.isRequired,
    activeMarker: PropTypes.object.isRequired,
    beachClick: PropTypes.func.isRequired,
    selectedBeach: PropTypes.object.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.props.filterBeaches(query)
  }

  render() {
    const { filteredBeaches, selectedBeach, beachClick, activeMarker, showingInfoWindow } = this.props
    const { query } = this.state
    return (
      <div className="search">
        <div className="search-bar">
          <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Filter beaches"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-beaches-results">
          <ul className="beaches-list">
            {filteredBeaches.map((beach) => (
              <li
                key={beach.spot_id}>
                <div
                  className="beach"
                  onClick={beachClick}
                >
                  <a>
                    {beach.spot_name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {console.log(selectedBeach)}
        </div>
      </div>
    );
  }
}

export default ListView;
