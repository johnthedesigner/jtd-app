import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import FillAdjustment from './adjustments/FillAdjustment'
import DimensionsAdjustment from './adjustments/DimensionsAdjustment'

class AdjustmentsPalette extends React.Component {
  render() {
    const {
      adjustLayers,
      adjustments,
      layerIds,
    } = this.props

    return (
      <div className="adjustments-palette__wrapper">

        <div className="adjustments-palette__header">
          {'Adjustments'}
        </div>

        <div className="adjustments-palette__adjustments-list">
          <DimensionsAdjustment
            adjustLayers={adjustLayers}
            adjustments={idx(adjustments, _ => _.dimensions)}
            layerIds={layerIds}/>
          <FillAdjustment
            adjustLayers={adjustLayers}
            adjustments={idx(adjustments, _ => _.fill)}
            layerIds={layerIds}/>
        </div>
      </div>
    )
  }
}

AdjustmentsPalette.propTypes = {
  adjustments : PropTypes.object
}

export default AdjustmentsPalette