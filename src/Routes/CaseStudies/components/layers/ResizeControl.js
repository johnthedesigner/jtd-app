import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import ResizeHandle from './ResizeHandle'
import { scaleAllDimensions, unscaleDimension } from '../../artboardUtils'

class ResizeControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
      },
      pointerOffset: {},
    }
    this.calculateLayerResize = this.calculateLayerResize.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentWillMount() {
    let { dimensions, scaleFactor } = this.props
    // If selection dimensions are present, update component state
    if (dimensions.x !== null) {
      this.setState({
        dimensions: scaleAllDimensions(dimensions,scaleFactor,true)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    let { dimensions, scaleFactor } = nextProps
    // If selection dimensions are present, update component state
    if (dimensions.x !== null) {
      this.setState({
        dimensions: scaleAllDimensions(dimensions,scaleFactor,true)
      })
    }
  }

  calculateLayerResize(offset, handleInfo) {
    let { scaleFactor } = this.props
    let { x, y } = offset
    let getVectoredDistance = (direction) => {
      // Get original drag distance
      let distance = Math.sqrt(
        Math.pow(x, 2) +
        Math.pow(y, 2)
      )
      // Adjust Offset coordinates realative to each side
      let adjustedOffset = [x, y]
      switch(direction) {
        case 'top':
          adjustedOffset = [-1 * y, x]
          break
        case 'right':
          adjustedOffset = [x, y]
          break
        case 'bottom':
          adjustedOffset = [y, -1 * x]
          break
        case 'left':
          adjustedOffset = [-1 * y, -1 * x]
          break
        default:
          // Do nothing
      }
      // Get drag angle in degrees adjusted for scale factor
      let angleRadians = Math.atan2(adjustedOffset[1], adjustedOffset[0])
      angleRadians -= this.state.dimensions.rotation * (Math.PI / 180)
      console.log(this.state.dimensions)
      console.log(angleRadians / (Math.PI / 180))
      // Get vectored drag distance and undo scale factor
      let vectoredDistance = distance * Math.cos(angleRadians)
      vectoredDistance = unscaleDimension(vectoredDistance, scaleFactor)
      return vectoredDistance
    }
    // Return an array of directions/scale distances
    return _.map(handleInfo.directions, (direction) => {
      return {
        direction,
        distance: getVectoredDistance(direction)
      }
    })
  }

  handleResize(resizeDirectives, previewOnly) {
    this.props.scaleLayer(resizeDirectives, previewOnly)
  }

  render() {
    const { connectDropTarget, isActive } = this.props
    const { x, y, width, height, rotation } = this.state.dimensions
    const toggleActive = () => {
      return (isActive) ? ' is-active' : ''
    }

    const dropTargetStyles = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    const resizeableControlStyles = {
      position: 'absolute',
      top: y,
      left: x,
      width,
      height,
      transform: `rotate(${rotation}deg)`
    }

    return connectDropTarget(
      <div className='resize-control__drop-target' style={dropTargetStyles}>
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
      </div>
    )
  }
}

// Capture handle drag and drop activity
const dropTargetSpec = {
  drop(props, monitor, component) {
    let resizeDirectives = component.calculateLayerResize(
      monitor.getDifferenceFromInitialOffset(),
      monitor.getItem()
    )
    component.handleResize(resizeDirectives, false)
  },
  hover(props, monitor, component) {
    let newPointerOffset = monitor.getDifferenceFromInitialOffset()
    if (
      newPointerOffset.x !== component.state.pointerOffset.x ||
      newPointerOffset.y !== component.state.pointerOffset.y
    ) {
      let resizeDirectives = component.calculateLayerResize(
        newPointerOffset,
        monitor.getItem()
      )
      // Set latest pointer offset before dispatching drag event
      component.state.pointerOffset = newPointerOffset
      component.handleResize(resizeDirectives, true)
    } else {
      component.state.pointerOffset = newPointerOffset
    }
  }
}

// Inject props from layer resize handle activity
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

ResizeControl.propTypes = {
  dimensions: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  scaleFactor: PropTypes.number.isRequired,
  scaleLayer: PropTypes.func.isRequired,
}

export default DragDropContext(HTML5Backend)(DropTarget('HANDLE', dropTargetSpec, collect)(ResizeControl))