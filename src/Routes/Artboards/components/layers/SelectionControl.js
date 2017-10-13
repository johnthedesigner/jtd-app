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
      x: '',
      y: '',
      width: '',
      height: '',
    }
    this.handleResize = this.handleResize.bind(this)
    this.handleResizeStop = this.handleResizeStop.bind(this)
  }

  componentWillMount() {
    this.setState(scaleAllDimensions(this.props.dimensions,this.props.scaleFactor,true))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(scaleAllDimensions(nextProps.dimensions,nextProps.scaleFactor,true))
    this.resizeable.updatePosition(scaleAllDimensions(nextProps.dimensions,nextProps.scaleFactor,true))
    this.resizeable.updateSize(scaleAllDimensions(nextProps.dimensions,nextProps.scaleFactor,true))
  }

  handleResize(e, direction, ref, delta) {
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
    let lowerDirection = _.toLower(direction)
    let yOffset = ( _.includes(lowerDirection, 'top'))
      ? (delta.height * -1) : 0
    let xOffset = ( _.includes(lowerDirection, 'left'))
      ? (delta.width * -1) : 0
    console.log(scaleAllDimensions(delta,this.props.scaleFactor, false).width)
    console.log(scaleAllDimensions(delta,this.props.scaleFactor, false).height)
    this.props.resizeLayers(
      [],
      scaleAllDimensions(delta,this.props.scaleFactor, false),
      unscaleDimension(xOffset,this.props.scaleFactor),
      unscaleDimension(yOffset,this.props.scaleFactor)
    )
  }

  render() {

    const { isActive } = this.props
    const toggleActive = () => {
      return (isActive) ? ' is-active' : ''
    }

    const resizeableControlStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
    }

    return (
      <div
        className={'selection-control__wrapper' + toggleActive()}
        style={resizeableControlStyles}>
        <Draggable
          className='selection-control__resizeable-area'
          ref={c => { this.resizeable = c }}
          default={{
            x: this.state.x,
            y: this.state.y,
            width: this.state.width,
            height: this.state.height
          }}
          disableDragging={true}
          onResize={this.handleResize}
          onResizeStart={this.handleResizeStart}
          onResizeStop={this.handleResizeStop}
          resizeGrid={[
            scaleDimension(10,this.props.scaleFactor),
            scaleDimension(10,this.props.scaleFactor)
          ]}>
          <div className='resize-handles__top-left'></div>
          <div className='resize-handles__top-center'></div>
          <div className='resize-handles__top-right'></div>
          <div className='resize-handles__right-middle'></div>
          <div className='resize-handles__bottom-right'></div>
          <div className='resize-handles__bottom-center'></div>
          <div className='resize-handles__bottom-left'></div>
          <div className='resize-handles__left-middle'></div>
        </Draggable>
      </div>
    )
  }
}

SelectionControl.propTypes = {
  dimensions : PropTypes.object.isRequired
}

export default SelectionControl