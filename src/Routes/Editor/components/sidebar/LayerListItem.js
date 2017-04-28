import React from 'react'
import PropTypes from 'prop-types'

import ActionIcon from '../../../../components/ActionIcon'
import SubLayerGroup from './SubLayerGroup'

class LayerListItem extends React.Component {
  render() {

    const {
      artboardColor,
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

    const showSubLayerGroup = (layers) => {
      if (layers) {
        return (
          <SubLayerGroup
            artboardColor={artboardColor}
            artboardId={artboardId}
            layers={layers}
            selectLayer={selectLayer}
            showHideLayer={showHideLayer}
            highlightLayer={highlightLayer}/>
        )
      }
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
        {showSubLayerGroup(layer.layers)}
      </div>
    )
  }
}

LayerListItem.propTypes = {
  layers: PropTypes.object.isRequired
}

export default LayerListItem