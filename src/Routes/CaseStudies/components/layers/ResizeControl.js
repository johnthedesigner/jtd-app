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
    _.each(resizeDirectives, (directive) => {
      let { direction, distance } = directive
      switch(direction) {
        case 'top':
          delta.height = distance
          yOffset = 0 - distance
          break
        case 'right':
          delta.width = distance
          break
        case 'bottom':
          delta.height = distance
          break
        case 'left':
          delta.width = distance
          xOffset = 0 - distance
          break
        default:
          // Do nothing
      }
    })
    // console.log('call resizeLayers: ', resizeType)
    this.props.resizeLayers(
      scaleAllDimensions(delta,this.props.scaleFactor, false),
      unscaleDimension(xOffset,this.props.scaleFactor),
      unscaleDimension(yOffset,this.props.scaleFactor),
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
