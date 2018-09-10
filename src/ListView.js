import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Beach from './Beach'

class ListView extends Component {
  static propTypes = {
    beaches: PropTypes.array.isRequired,
    filteredBeaches: PropTypes.array.isRequired,
    filterBeaches: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.props.filterBeaches(query)
  }

  render() {
    const { filteredBeaches } = this.props
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
              <Beach
                key={beach.spot_id}
                beach={beach}
                />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListView;
