import React from 'react'
import PropTypes from 'prop-types'

class AdjustmentsPalette extends React.Component {
  render() {

    return (
      <div className="adjustments-palette__wrapper">

        <div className="adjustments-palette__header">
          {'Adjustments'}
        </div>

        <div className="adjustments-palette__adjustments-list">
          {this.props.children}
        </div>
      </div>
    )
  }
}

AdjustmentsPalette.propTypes = {
  selectedLayer : PropTypes.object
}

export default AdjustmentsPalette