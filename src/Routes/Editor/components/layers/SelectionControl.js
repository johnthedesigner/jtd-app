import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-rnd'
import _ from 'lodash'

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
    this.setState({
      x: this.props.dimensions.x,
      y: this.props.dimensions.y,
      width: this.props.dimensions.width,
      height: this.props.dimensions.height,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      x: nextProps.dimensions.x,
      y: nextProps.dimensions.y,
      width: nextProps.dimensions.width,
      height: nextProps.dimensions.height,
    })
    this.resizeable.updatePosition(nextProps.dimensions)
    this.resizeable.updateSize(nextProps.dimensions)
  }

  handleResize(e, direction, ref, delta) {
    console.log(e,direction,ref,delta)
    let xOffset = ( _.startsWith(direction, 'top'))
      ? delta.height * -1 : delta.height
    let yOffset = ( _.startsWith(direction, 'left'))
      ? delta.width * -1 : delta.width
    this.setState({
      x: this.state.x + xOffset,
      y: this.state.y + yOffset,
      width: this.props.dimensions.width + delta.width,
      height: this.props.dimensions.height + delta.height,
    })
  }

  handleResizeStop(e, direction, ref, delta) {
    let lowerDirection = _.toLower(direction)
    let yOffset = ( _.includes(lowerDirection, 'top'))
      ? delta.height * -1 : 0
    let xOffset = ( _.includes(lowerDirection, 'left'))
      ? delta.width * -1 : 0
    this.props.resizeLayers([], delta, xOffset, yOffset)
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
          width={this.state.width}
          height={this.state.height}
          onResize={this.handleResize}
          onResizeStart={this.handleResizeStart}
          onResizeStop={this.handleResizeStop}
          resizeGrid={[10,10]}>
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