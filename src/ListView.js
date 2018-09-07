import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Beach from './Beach'

class ListView extends Component {
  static propTypes = {
    county: PropTypes.string.isRequired,
    beaches: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: []
  }

  searchBeaches = (query) => {
    let results = ''
    this.props.beaches.filter((beach) => {
      beach.spot_name.includes(query)
    })
    this.setState(state => ({
      searchResults: results
    }))
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if(query.length > 0) {
      this.searchBeaches(query)
    }
  }

  render() {
    const { beaches } = this.props
    const { query, searchResults } = this.state
    return (
      <div className="search">
        <div className="search-bar">
          <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search beaches"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-beaches-results">
          <ul className="beaches-list">
            {beaches.length > 0 && beaches.map((beach) => (
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
