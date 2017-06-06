import React from 'react'
import PropTypes from 'prop-types'

import ActionIcon from '../../../../components/ActionIcon'

class LayerListItem extends React.Component {
  render() {
    const {
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

    const listIconTypes = {
      image: 'image',
      text: 'text_format',
      rectangle: 'crop_landscape'
    }

    return (
      <div>
        <div
          className={
            'layer-list-item__wrapper'
            + toggleSelected()
            + toggleHidden()
          }
          onClick={(e) => {
            e.stopPropagation() // Prevent click from bubbling up to artboard
            selectLayer(layer.id, e.shiftKey)
          }}
          onMouseEnter={() => {
            highlightLayer(layer.id)
          }}
          onMouseLeave={() => {
            highlightLayer(null)
          }}>
          <ActionIcon
            iconType={listIconTypes[layer.type]}
            className='layer-list-item__layer-type-icon'/>
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
      </div>
    )
  }
}

LayerListItem.propTypes = {
  layer: PropTypes.object.isRequired
}

export default LayerListItem