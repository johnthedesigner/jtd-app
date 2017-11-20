import React from 'react'
import _ from 'lodash'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class ResizeControlDropTarget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pointerOffset: {}
    }
    this.calculateLayerResize = this.calculateLayerResize.bind(this)
  }

  componentWillMount() {
    this.setState({
      dimensions: this.props.dimensions
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dimensions: nextProps.dimensions
    })
  }

  calculateLayerResize(offset, handleInfo) {
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
      // Get drag angle in degrees
      let angleRadians = Math.atan2(adjustedOffset[1], adjustedOffset[0])
      angleRadians -= this.state.dimensions.rotation * (Math.PI / 180)
      // Get vectored drag distance
      let vectoredDistance = distance * Math.cos(angleRadians)
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
