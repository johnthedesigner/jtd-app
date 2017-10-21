import React from 'react'
import PropTypes from 'prop-types'

class ImageLayer extends React.Component {
  render() {

    const { layer, layerScaleStyles } = this.props

    const { image } = layer.adjustments

    return (
      <img src={image.src} alt={layer.title} style={layerScaleStyles}/>
    )
  }
}

ImageLayer.propTypes = {
  layer : PropTypes.object.isRequired,
  layerScaleStyles: PropTypes.object.isRequired,
}

export default ImageLayer