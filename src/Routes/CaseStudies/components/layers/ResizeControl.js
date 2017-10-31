import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-rnd'
import _ from 'lodash'

import {
  scaleDimension,
  unscaleDimension,
  scaleAllDimensions
} from '../../artboardUtils'

class SelectionControl extends React.Component {
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
    this.handleClick = this.handleClick.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
  }

  componentWillMount() {
    this.setState(scaleAllDimensions(this.props.dimensions,this.props.scaleFactor,true))
  }

  componentWillReceiveProps(nextProps) {
    let nextDimensions =
      scaleAllDimensions(nextProps.dimensions,nextProps.scaleFactor,true)
    this.setState(nextDimensions)
    this.resizeable.updatePosition(nextDimensions)
    this.resizeable.updateSize(nextDimensions)
  }

  handleClick(e) {
    e.stopPropagation()
    console.log('handle selection control click')
  }

  handleResize(e, direction, ref, delta) {
    e.stopPropagation()

    let { width, height } = this.props.dimensions
    let { scaleFactor } = this.props

    // Get x,y offset if dragging from top left
    let xOffset = ( _.startsWith(direction, 'top'))
      ? delta.height * -1 : delta.height
    let yOffset = ( _.startsWith(direction, 'left'))
      ? delta.width * -1 : delta.width

    // Scale values before setting in component state
    this.setState({
      x: this.state.x  + xOffset,
      y: this.state.y + yOffset,
      width: scaleDimension(width,scaleFactor) + delta.width,
      height: scaleDimension(height,scaleFactor) + delta.height,
    })
  }

  handleResizeStop(e, direction, ref, delta) {
    e.stopPropagation()

    let lowerDirection = _.toLower(direction)
    let yOffset = ( _.includes(lowerDirection, 'top'))
      ? (delta.height * -1) : 0
    let xOffset = ( _.includes(lowerDirection, 'left'))
      ? (delta.width * -1) : 0
    this.props.resizeLayers(
      scaleAllDimensions(delta,this.props.scaleFactor, false),
      unscaleDimension(xOffset,this.props.scaleFactor),
      unscaleDimension(yOffset,this.props.scaleFactor)
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
      top: 0,
      left: 0,
    }

    const draggableStyles = {
      transform: `rotate(${rotation}deg)`
    }

    return (
      <div
        className={'selection-control__wrapper' + toggleActive()}
        style={resizeableControlStyles}>
        <Draggable
          className='selection-control__resizeable-area'
          ref={c => { this.resizeable = c }}
          default={{
            x,
            y,
            width,
            height
          }}
          disableDragging={true}
          onClick={this.handleClick}
          onResize={this.handleResize}
          onResizeStart={this.handleResizeStart}
          onResizeStop={this.handleResizeStop}
          resizeGrid={[
            scaleDimension(10,this.props.scaleFactor),
            scaleDimension(10,this.props.scaleFactor)
          ]}
          style={draggableStyles}>
          <div className='resize-handles__top-left'onClick={this.handleClick}></div>
          <div className='resize-handles__top-right'></div>
          <div className='resize-handles__bottom-right'></div>
          <div className='resize-handles__bottom-left'></div>
        </Draggable>
      </div>
    )
  }
}

SelectionControl.propTypes = {
  dimensions : PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  resizeLayers: PropTypes.func.isRequired,
  scaleFactor: PropTypes.number.isRequired,
}

export default SelectionControl