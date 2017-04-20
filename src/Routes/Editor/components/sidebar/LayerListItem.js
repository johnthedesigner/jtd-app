import React from 'react'
import PropTypes from 'prop-types'

class Layer extends React.Component {
  render() {

    const {
      artboardId,
      highlightLayer,
      layer,
      selectLayer,
    } = this.props

    const toggleSelected = () => {
      return (layer.isSelected) ? ' is-selected' : ''
    }

    return (
      <div
        className={'layer-list-item__wrapper' + toggleSelected()}
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