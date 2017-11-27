import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import FillAdjustment from './FillAdjustment'
import DimensionsAdjustment from './DimensionsAdjustment'
import TypeAdjustment from './TypeAdjustment'

class AdjustmentsPanel extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.stopPropagation()
  }

  render() {
    const {
      adjustLayers,
      adjustments,
      bumpLayers,
      dimensions,
      rotateLayer,
      scaleLayer,
    } = this.props

    return (
      <div className="adjustments-panel__wrapper" onClick={this.handleClick}>
        <div className="adjustments-panel__header">Dimensions</div>
        <DimensionsAdjustment
          adjustLayers={adjustLayers}
          bumpLayers={bumpLayers}
          rotateLayer={rotateLayer}
          scaleLayer={scaleLayer}
          adjustments={dimensions}/>
        <div className="adjustments-panel__header">Fill</div>
        <FillAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.fill)}/>
        <div className="adjustments-panel__header">Type</div>
        <TypeAdjustment
          adjustLayers={adjustLayers}
          adjustments={idx(adjustments, _ => _.text)}/>
      </div>
    )
  }
}

AdjustmentsPanel.propTypes = {
  adjustments : PropTypes.object,
}

export default AdjustmentsPanel
