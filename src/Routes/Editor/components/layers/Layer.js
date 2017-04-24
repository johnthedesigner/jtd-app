import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

import { layerTypes } from '../../../../store/entities/Layers'
import ResizeHandles from './ResizeHandles'
import ImageLayer from './ImageLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'

class Layer extends React.Component {
  render() {

    const layerType = (layer) => {
      switch (layer.type) {
        case layerTypes.image:
          return ( <ImageLayer layer={layer}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer layer={layer}/> )

        case layerTypes.text:
          return ( <TextLayer layer={layer}/> )

        default:
          console.log('Unrecognized layer type')
      }
    }

    const {
      artboardColor,
      artboardId,
      layer,
      highlightLayer,
      selectLayer,
    } = this.props

    const { dimensions } = layer.adjustments

    const wrapperStyles = {
      marginLeft: dimensions.x + 'px',
      marginTop: dimensions.y + 'px',
      width: dimensions.width * dimensions.scaleX + 'px',
      height: dimensions.height * dimensions.scaleY + 'px'
    }

    const highlightStyles = {
      borderColor: artboardColor,
      boxShadow: '0 0 0 4px ' + Color(artboardColor).fade(0.7)
    }

    const toggleSelected = () => {
      return (layer.isSelected) ? ' is-selected' : ''
    }

    const toggleHighlighted = () => {
      return (layer.isHighlighted) ? ' is-highlighted' : ''
    }

    return (
      <div
        className={'layer__wrapper' + toggleSelected() + toggleHighlighted()}
        onClick={(e) => {
          e.stopPropagation() // Prevent click from bubbling up to artboard
          selectLayer(artboardId, layer.id)
        }}
        onMouseEnter={() => {
          highlightLayer(artboardId, layer.id)
        }}
        onMouseLeave={() => {
          highlightLayer(null, null)
        }}
        style={wrapperStyles}>
        {layerType(layer)}
        <div className='layer__highlight-indicator' style={highlightStyles}></div>
        <div className='layer__selection-indicator'></div>
        <ResizeHandles layerId={layer.id} artboardId={artboardId}/>
      </div>
    )
  }
}

Layer.propTypes = {
  artboardId: PropTypes.number.isRequired,
  layer: PropTypes.object.isRequired,
}

export default Layer