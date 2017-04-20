import React from 'react'
import PropTypes from 'prop-types'

import DimensionsAdjustment from './adjustments/DimensionsAdjustment'

class AdjustmentsPalette extends React.Component {
  render() {

    const {
      selectedLayer,
      updateDimensions,
    } = this.props

    const showAdjustmentFields = (layer) => {
      if (layer !== undefined) {
        if (layer.dimensions !== null || true) {
          return ( <DimensionsAdjustment layer={selectedLayer} updateDimensions={updateDimensions}/> )
        }
      }
    }

    return (
      <div className="adjustments-palette__wrapper">

        <div className="adjustments-palette__header">
          {'Adjustments'}
        </div>

        <div className="adjustments-palette__adjustments-list">
          {showAdjustmentFields(selectedLayer)}
        </div>
      </div>
    )
  }
}

AdjustmentsPalette.propTypes = {
  selectedLayer : PropTypes.object
}

export default AdjustmentsPalette