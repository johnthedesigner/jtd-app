import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class RectangleLayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      layer: props.layer,
      layerScaleStyles: props.layerScaleStyles
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps,this.props)
  }

  componentWillMount() {
    this.setState({
      layer: this.props.layer,
      layerScaleStyles: this.props.layerScaleStyles
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      layer: nextProps.layer,
      layerScaleStyles: nextProps.layerScaleStyles
    })
  }

  handleKeyPress(e) {
    console.log(e.key)
  }

  handleFocus(e) {
    e.target.click()
  }

  render() {

    const { layerScaleStyles } = this.state

    const { fill } = this.state.layer.adjustments

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
  layer : PropTypes.object.isRequired,
  layerScaleStyles: PropTypes.object.isRequired
}

export default RectangleLayer