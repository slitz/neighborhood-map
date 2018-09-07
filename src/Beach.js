import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Beach extends Component {
  static propTypes = {
    beach: PropTypes.object.isRequired
  }

  render () {
    const { beach } = this.props
    return (
      <li>
        <div className="beach">
          {beach.spot_name}
        </div>
      </li>
    )
  }
}

export default Beach
