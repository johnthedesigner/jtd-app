import React from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-rnd'
import _ from 'lodash'

class Flyout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    }
    this.closeFlyout = this.handleClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDrag = this.handleDrag.bind(this)
    this.handleDragStart = this.handleDragStart.bind(this)
  }

  closeFlyout (e) {
    e.stopPropagation()
    console.log('close flyout', this.props.id)
  }

  handleClick (e) {
    e.stopPropagation()
  }

  handleDrag(e, data) {
    // let { caseStudyId, scaleFactor } = this.props
    // this.props.dragLayers(
    //   caseStudyId,
    //   this.props.layer.id,
    //   unscaleDimension(data.x,scaleFactor),
    //   unscaleDimension(data.y,scaleFactor)
    // )
  }

  handleDragStart(e, data) {
    e.stopPropagation()
    // let { caseStudyId, layer } = this.props
    // this.props.selectLayer(caseStudyId, layer.id, e.shiftKey)
  }

  render() {
    const enableResize = {
      bottom: false,
      bottomLeft: false,
      bottomRight: false,
      left: false,
      right: false,
      top: false,
      topLeft: false,
      topRight: false,
    }
    const {
      id,
      title,
      toggleFlyout,
    } = this.props

    if (this.props.isVisible) {
      return (
        <Draggable
          className='flyout__wrapper'
          default={{
            x: 10,
            y: 10,
            width: this.state.width,
            height: this.state.height
          }}
          enableResizing={enableResize}
          height={this.state.height}
          onDrag={this.handleDrag}
          onDragStart={this.handleDragStart}
          ref={c => { this.draggable = c }}
          width={this.state.width}>
          <div className='flyout__header'>
            <p className='flyout__title'>{title}</p>
            <button
              className='flyout__close'
              onClick={() => toggleFlyout(id)}>
              close
            </button>
          </div>
          {this.props.children}
        </Draggable>
      )
    } else {
      return null
    }
  }
}

Flyout.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Flyout