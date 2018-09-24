import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListView extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired,
    filteredBeaches: PropTypes.array.isRequired,
    beachNameClick: PropTypes.func.isRequired
  }

  render() {
    const { query, updateQuery, filteredBeaches, beachNameClick } = this.props
    return (
      <div className="search">
        <div className="search-bar">
          <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Filter beaches"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-beaches-results">
          <ul
            className="beaches-list"
            >
            {filteredBeaches.map((beach) => (
              <li
                key={beach.spot_name}
              >
                <div
                  className="beach"
                  onClick={(event) => beachNameClick(beach.spot_name)}
                >
                  <a>
                    {beach.spot_name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListView;
