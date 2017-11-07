import React from 'react'
import _ from 'lodash'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class ResizeControlDropTarget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: {},
      pointerOffset: {}
    }
    this.calculateLayerResize = this.calculateLayerResize.bind(this)
    this.rotateCoords = this.rotateCoords.bind(this)
  }

  rotateCoords(dimensions) {
    let { x, y, width, height, rotation } = dimensions
    let theta =  rotation * Math.PI / 180.0
    if (dimensions.x) {
      let center = [x + width / 2, y + height / 2]
      let coordsUnrotated = {
        topLeft: [x, y],
        topRight: [x + width, y],
        bottomRight: [x + width, y + height],
        bottomLeft: [x, y + height]
      }
      let rotatePoint = (coords) => {
        let dX = coords[0] - center[0]
        let dY = coords[1] - center[1]
        return [
          dX * Math.cos(theta) - dY * Math.sin(theta) + center[0],
          dX * Math.sin(theta) + dY * Math.cos(theta) + center[1]
        ]
      }
      let coordsRotated = {
        center,
        topLeft: rotatePoint(coordsUnrotated.topLeft),
        topRight: rotatePoint(coordsUnrotated.topRight),
        bottomRight: rotatePoint(coordsUnrotated.bottomRight),
        bottomLeft: rotatePoint(coordsUnrotated.bottomLeft)
      }
      return coordsRotated
    }
  }

  componentWillMount() {
    this.setState({
      coords: this.rotateCoords(this.props.dimensions),
      dimensions: this.props.dimensions
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      coords: this.rotateCoords(nextProps.dimensions),
      dimensions: nextProps.dimensions
    })
  }

  calculateLayerResize(offset, handleInfo) {
    let { coords, dimensions } = this.state
    let { x, y } = offset
    let getVectoredDistance = (direction) => {
      // Get original drag distance
      let distance = Math.sqrt(
        Math.pow(x, 2) +
        Math.pow(y, 2)
      )
      // Get drag angle in degrees
      let angle = Math.atan2(y, x) * 180 / Math.PI
      // Adjust angle for rotation and handle offset
      switch(direction) {
        case 'top':
          angle = angle + 90 - dimensions.rotation
          break
        case 'right':
          angle = angle + 0 - dimensions.rotation
          break
        case 'bottom':
          angle = angle - 90 - dimensions.rotation
          break
        case 'left':
          angle = angle + 180 - dimensions.rotation
          break
        default:
          // Do nothing
      }
      // Get vectored drag distance
      let vectoredDistance = Math.abs(distance * Math.cos(angle))
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

  render() {
    const { connectDropTarget } = this.props

    const dropTargetStyles = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }

    return connectDropTarget(
      <div className='resize-control__drop-target' style={dropTargetStyles}>
        {this.props.children}
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
    props.handleResize(resizeDirectives, 'drop')
  },
  hover(props, monitor, component) {
    let newPointerOffset = monitor.getDifferenceFromInitialOffset()
    console.log(component.state.pointerOffset)
    console.log(newPointerOffset)
    if (
      newPointerOffset.x !== component.state.pointerOffset.x &&
      newPointerOffset.y !== component.state.pointerOffset.y
    ) {
      let resizeDirectives = component.calculateLayerResize(
        newPointerOffset,
        monitor.getItem()
      )
      // Set latest pointer offset before dispatching drag event
      component.state.pointerOffset = newPointerOffset
      props.handleResize(resizeDirectives, 'drag')
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

export default DragDropContext(HTML5Backend)(DropTarget('HANDLE', dropTargetSpec, collect)(ResizeControlDropTarget))