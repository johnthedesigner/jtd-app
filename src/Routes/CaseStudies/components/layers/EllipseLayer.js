import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class EllipseLayer extends React.Component {
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

    const { fill, dimensions } = this.state.layer.adjustments

    const ellipseStyles = {
      width: '100%',
      height: '100%'
    }

    return (
      <div style={layerScaleStyles}>
        <svg
          fill={fill.backgroundColor}
          style={ellipseStyles}
          width={dimensions.width}
          height={dimensions.height}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <ellipse cx={dimensions.width/2} cy={dimensions.height/2} rx={dimensions.width/2} ry={dimensions.height/2}/>
        </svg>
      </div>
    )
  }
}

EllipseLayer.propTypes = {
  layer : PropTypes.object.isRequired
}

export default EllipseLayer