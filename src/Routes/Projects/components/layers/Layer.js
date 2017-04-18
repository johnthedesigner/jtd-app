import React from 'react'
import PropTypes from 'prop-types'

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
      artboardId,
      layer,
      selections,
      selectLayer
    } = this.props

    const isLayerSelected = () => {
      if (layer.id === selections.layerId && artboardId === selections.artboardId) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    const wrapperStyles = {
      marginLeft: layer.dimensions.x + 'px',
      marginTop: layer.dimensions.y + 'px',
      width: layer.dimensions.width * layer.dimensions.scaleX + 'px',
      height: layer.dimensions.height * layer.dimensions.scaleY + 'px'
    }

    return (
      <div
        className={'layer__wrapper' + isLayerSelected()}
        onClick={(e) => {
          e.stopPropagation()
          selectLayer(artboardId, layer.id)
        }}
        style={wrapperStyles}>
        {layerType(layer)}
      </div>
    )
  }
}

Layer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default Layer