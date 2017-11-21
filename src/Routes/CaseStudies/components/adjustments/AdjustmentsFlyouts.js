import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import Flyout from './Flyout'
import FillAdjustment from './FillAdjustment'
import DimensionsAdjustment from './DimensionsAdjustment'
import TypeAdjustment from './TypeAdjustment'

class AdjustmentsFlyouts extends React.Component {
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
      activeFlyout,
      bumpLayers,
      dimensions,
      rotateLayer,
      scaleLayer,
      toggleFlyout,
    } = this.props

    return (
      <div className="adjustments-flyouts__wrapper" onClick={this.handleClick}>
        <Flyout
          id='dimensions'
          title='Dimensions'
          isVisible={activeFlyout === 'dimensions'}
          toggleFlyout={toggleFlyout}>
          <DimensionsAdjustment
            adjustLayers={adjustLayers}
            bumpLayers={bumpLayers}
            rotateLayer={rotateLayer}
            scaleLayer={scaleLayer}
            adjustments={dimensions}/>
        </Flyout>
        <Flyout
          id='fill'
          title='Fill'
          isVisible={activeFlyout === 'fill'}
          toggleFlyout={toggleFlyout}>
          <FillAdjustment
            adjustLayers={adjustLayers}
            adjustments={idx(adjustments, _ => _.fill)}/>
        </Flyout>
        <Flyout
          id='type'
          title='Type'
          isVisible={activeFlyout === 'type'}
          toggleFlyout={toggleFlyout}>
          <TypeAdjustment
            adjustLayers={adjustLayers}
            adjustments={idx(adjustments, _ => _.type)}/>
        </Flyout>
      </div>
    )
  }
}

AdjustmentsFlyouts.propTypes = {
  adjustments : PropTypes.object,
  activeFlyout: PropTypes.string,
}

export default AdjustmentsFlyouts
