import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'
import _ from 'lodash'

import ColorInput from './ColorInput'
import SelectInput from './SelectInput'
import { fillTypes } from './adjustmentOptions'

class FillAdjustment extends React.Component {
  render() {
    let adjustmentGroup = 'fill'

    const { adjustments, adjustLayers } = this.props

    const setLayerAdjustment = (propertyName, value) => {
      adjustLayers(adjustmentGroup, propertyName, value)
    }

    const setFillType = (value) => setLayerAdjustment('type', value)
    const fillTypeOptions = _.map(fillTypes, option => {
      return { name: option.name, value: option.type }
    })
    let type = idx(adjustments, _ => _.type)
    if (!type) type = ''

    let backgroundColor = idx(adjustments, _ => _.color)
    if (!backgroundColor) backgroundColor = ''

    if (adjustments) {
      return(
        <div className='adjustments-panel__adjustment-block'>
          <SelectInput
            key={adjustmentGroup + 'type'}
            options={fillTypeOptions}
            propertyName={'type'}
            setValue={setFillType}
            valueFromProps={type}/>
          <ColorInput
            key={adjustmentGroup + 'backgroundColor'}
            propertyName={'backgroundColor'}
            setLayerAdjustment={setLayerAdjustment}
            valueFromProps={backgroundColor}/>
        </div>
      )
    } else {
      return null
    }
  }
}

FillAdjustment.propTypes = {
  adjustments: PropTypes.object,
  adjustLayers: PropTypes.func.isRequired,
}

export default FillAdjustment
