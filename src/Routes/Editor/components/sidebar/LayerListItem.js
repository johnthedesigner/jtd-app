import React from 'react'
import PropTypes from 'prop-types'

import ActionIcon from '../../../../components/ActionIcon'

class Layer extends React.Component {
  render() {

    const {
      artboardId,
      highlightLayer,
      layer,
      selectLayer,
      showHideLayer,
    } = this.props

    const toggleSelected = () => {
      return (layer.isSelected) ? ' is-selected' : ''
    }

    const toggleHidden = () => {
      return (layer.hide) ? ' is-hidden' : ''
    }

    return (
      <div
        className={
          'layer-list-item__wrapper'
          + toggleSelected()
          + toggleHidden()
        }
        onClick={(e) => {
          e.stopPropagation() // Prevent click from bubbling up to artboard
          selectLayer(artboardId, layer.id)
        }}
        onMouseEnter={() => {
          highlightLayer(artboardId, layer.id)
        }}
        onMouseLeave={() => {
          highlightLayer(null, null)
        }}>
        <div className='layer-list-item__layer-type'>
          <ActionIcon
            iconType='image'
            className='layer-list-item__layer-type-icon'/>
        </div>
        <div className='layer-list-item__label'>{layer.title}</div>
        <div className='layer-list-item__visibility-toggle'>
          <ActionIcon
            iconType={layer.hide ? 'visibility_off' : 'visibility_on'}
            className='layer-list-item__show-hide'
            onClick={(e) => {
              showHideLayer(layer.id)
              e.stopPropagation()
            }}/>
        </div>
      </div>
    )
  }
}

Layer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default Layer