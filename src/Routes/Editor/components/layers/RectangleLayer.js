import React from 'react'
import PropTypes from 'prop-types'

class RectangleLayer extends React.Component {
  constructor(props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e) {
    console.log(e.key)
  }

  handleFocus(e) {
    e.target.click()
  }

  render() {

    const { layer, layerScaleStyles } = this.props

    const { fill } = layer.adjustments

    const rectangleStyles = {
      ...layerScaleStyles,
      backgroundColor: fill.backgroundColor
    }

    return (
      <div className='layer__background' style={rectangleStyles}></div>
    )
  }
}

RectangleLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default RectangleLayer