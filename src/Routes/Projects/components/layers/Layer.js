import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'


import ImageLayer from './ImageLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'

class Layer extends React.Component {
  render() {

    const layerType = (layer) => {
      switch (layer.type) {
        case 'image':
          return ( <ImageLayer layer={layer}/> )

        case 'rectangle':
          return ( <RectangleLayer layer={layer}/> )

        case 'text':
          return ( <TextLayer layer={layer}/> )

        default:
          console.log('Unrecognized layer type')
      }
    }

    const {
      artboardColor,
      artboardId,
      layer,
      selections,
      highlights,
      highlightLayer,
      selectLayer
    } = this.props

    const toggleSelected = () => {
      if (layer.id === selections.layerId && artboardId === selections.artboardId) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    const toggleHighlighted = () => {
      if (layer.id === highlights.layerId && artboardId === highlights.artboardId) {
        return ' is-highlighted'
      } else {
        return ' not-highighted'
      }
    }

    const wrapperStyles = {
      marginLeft: layer.dimensions.x + 'px',
      marginTop: layer.dimensions.y + 'px',
      width: layer.dimensions.width * layer.dimensions.scaleX + 'px',
      height: layer.dimensions.height * layer.dimensions.scaleY + 'px'
    }

    const highlightStyles = {
      borderColor: artboardColor,
      boxShadow: '0 0 0 4px ' + Color(artboardColor).fade(0.7)
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
      </div>
    )
  }
}

Layer.propTypes = {
  artboardId: PropTypes.number.isRequired,
  layer: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired,
  highlights: PropTypes.object.isRequired
}

export default Layer