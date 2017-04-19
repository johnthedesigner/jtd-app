import React from 'react'
import PropTypes from 'prop-types'

class Layer extends React.Component {
  render() {

    const {
      artboardId,
      layer,
      selections,
      selectLayer,
      highlightLayer
    } = this.props

    const isLayerSelected = () => {
      if (layer.id === selections.layerId && artboardId === selections.artboardId) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    return (
      <div
        className={'layer-list-item__wrapper' + isLayerSelected()}
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
          <i className='fa fa-photo'></i>
        </div>
        <div className='layer-list-item__label'>{layer.title}</div>
        <div className='layer-list-item__visibility-toggle'>
          <i className='fa fa-eye'></i>
        </div>
      </div>
    )
  }
}

Layer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default Layer