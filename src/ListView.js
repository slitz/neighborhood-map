import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ListView extends Component {
  static propTypes = {
    beaches: PropTypes.array.isRequired,
    filteredBeaches: PropTypes.array.isRequired,
    filterBeaches: PropTypes.func.isRequired
  }

  state = {
    query: '',
    selectedBeach: ''
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
              <li
                key={beach.spot_id}>
                <div
                  className="beach"
                  onClick={() => this.setState({ selectedBeach: beach.spot_name})}
                >
                  <a>
                    {beach.spot_name}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {console.log(this.state.selectedBeach)}
        </div>
      </div>
    );
  }
}

export default ListView;
