import React from 'react'
import PropTypes from 'prop-types'

class ImageLayer extends React.Component {
  render() {

    const { layer, layerStyles } = this.props

    const { image } = layer.adjustments

    return (
      <img
        className='layer__shape'
        style={layerStyles}
        src={image.src}
        alt={layer.title}/>
    )
  }
}

ImageLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default ImageLayer