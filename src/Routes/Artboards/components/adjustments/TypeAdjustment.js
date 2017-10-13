import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'

import ColorInput from './ColorInput'

class TypeAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'type'

    const { adjustments, layerIds, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(layerIds, adjustmentGroup, propertyName, value)
    }

    let color = idx(adjustments, _ => _.color)
    if (!color) color = ''

    if (adjustments) {
      return(
        <div>
          <div className="adjustment-group__header">
            <hr/>
            Type Styles
          </div>
          <ColorInput
            key={adjustmentGroup + 'color'}
            propertyName={'color'}
            label='Text Color'
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={color}/>
        </div>
      )
    } else {
      return null
    }
  }
}

TypeAdjustment.propTypes = {
  layer : PropTypes.object
}

export default TypeAdjustment