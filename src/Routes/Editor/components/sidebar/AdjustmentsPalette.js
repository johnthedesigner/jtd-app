import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import FillAdjustment from './adjustments/FillAdjustment'
import DimensionsAdjustment from './adjustments/DimensionsAdjustment'

class AdjustmentsPalette extends React.Component {
  render() {
    const {
      adjustLayer,
      adjustments,
      layerId,
    } = this.props

    return (
      <div className="adjustments-palette__wrapper">

        <div className="adjustments-palette__header">
          {'Adjustments'}
        </div>

        <div className="adjustments-palette__adjustments-list">
          <DimensionsAdjustment
            adjustLayer={adjustLayer}
            adjustments={idx(adjustments, _ => _.dimensions)}
            layerId={layerId}/>
          <FillAdjustment
            adjustLayer={adjustLayer}
            adjustments={idx(adjustments, _ => _.fill)}
            layerId={layerId}/>
        </div>
      </div>
    )
  }
}

AdjustmentsPalette.propTypes = {
  adjustments : PropTypes.object
}

export default AdjustmentsPalette