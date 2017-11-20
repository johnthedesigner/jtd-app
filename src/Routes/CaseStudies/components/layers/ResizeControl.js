import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import ResizeControlDropTarget from './ResizeControlDropTarget'
import ResizeHandle from './ResizeHandle'
import {
  unscaleDimension,
  scaleAllDimensions
} from '../../artboardUtils'

class ResizeControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: null,
      y: null,
      width: null,
      height: null,
      rotation: null,
      scaleX: null,
      scaleY: null
    }
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    let { dimensions, scaleFactor } = this.props
    // If selection dimensions are present, update component state
    if (dimensions.x) {
      this.setState(scaleAllDimensions(dimensions,scaleFactor,true))
    }
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, scaleFactor } = nextProps
    // If selection dimensions are present, update component state
    if (dimensions.x) {
      this.setState(scaleAllDimensions(dimensions,scaleFactor,true))
    }
  }

  handleResize(resizeDirectives, resizeType) {
    let delta = { x: 0, y: 0, height: 0, width: 0 }
    let xOffset = 0
    let yOffset = 0

    // Calculate how much additional offset is needed for rotated layers
    const getRotationOffset = (axis, distance) => {
      let rotationOffset = {
        x: distance * Math.cos((axis % 360) * (Math.PI / 180)),
        y: distance * Math.sin((axis % 360) * (Math.PI / 180))
      }
      return rotationOffset
    }

    // For each resize direction apply scale and position offsets
    _.each(resizeDirectives, (directive) => {
      let { direction, distance } = directive
      let { rotation } = this.state

      // First, apply position and scale offsets based on unrotated layer
      let resizeAxis = rotation
      switch(direction) {
        case 'right':
          delta.width = distance
          xOffset -= distance / 2
          break
        case 'bottom':
          resizeAxis += 90
          delta.height = distance
          yOffset -= distance / 2
          break
        case 'left':
          resizeAxis += 180
          delta.width = distance
          xOffset -= distance / 2
          break
        case 'top':
          resizeAxis += 270
          delta.height = distance
          yOffset -= distance / 2
          break
        default:
          // Do nothing
      }

      // Then apply additional offset for rotated layers
      xOffset += getRotationOffset(resizeAxis, (distance / 2)).x
      yOffset += getRotationOffset(resizeAxis, (distance / 2)).y
    })
    this.props.resizeLayers(
      scaleAllDimensions(delta, this.props.scaleFactor, false),
      unscaleDimension(xOffset, this.props.scaleFactor),
      unscaleDimension(yOffset, this.props.scaleFactor),
      resizeType
    )
  }

  render() {
    const { isActive } = this.props
    const { x, y, width, height, rotation } = this.state
    const toggleActive = () => {
      return (isActive) ? ' is-active' : ''
    }

    const resizeableControlStyles = {
      position: 'absolute',
      top: y,
      left: x,
      width,
      height,
      transform: `rotate(${rotation}deg)`
    }

    return (
      <ResizeControlDropTarget
        dimensions={this.state}
        handleResize={this.handleResize}>
        <div
          className={'resize-control__wrapper' + toggleActive()}
          style={resizeableControlStyles}>
          <ResizeHandle
            className='resize-handle__top'
            directions={['top']}/>
          <ResizeHandle
            className='resize-handle__right'
            directions={['right']}/>
          <ResizeHandle
            className='resize-handle__bottom'
            directions={['bottom']}/>
          <ResizeHandle
            className='resize-handle__left'
            directions={['left']}/>
          <ResizeHandle
            className='resize-handle__top-left'
            directions={['top', 'left']}/>
          <ResizeHandle
            className='resize-handle__top-right'
            directions={['top', 'right']}/>
          <ResizeHandle
            className='resize-handle__bottom-right'
            directions={['bottom', 'right']}/>
          <ResizeHandle
            className='resize-handle__bottom-left'
            directions={['bottom', 'left']}/>
        </div>
      </ResizeControlDropTarget>
    )
  }
}

ResizeControl.propTypes = {
  dimensions: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  resizeLayers: PropTypes.func.isRequired,
  scaleFactor: PropTypes.number.isRequired,
}

export default ResizeControl
