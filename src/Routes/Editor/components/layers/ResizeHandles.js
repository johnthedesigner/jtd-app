import React from 'react'
import PropTypes from 'prop-types'

class ResizeHandles extends React.Component {
  render() {

    // const { layerId, artboardId } = this.props

    return (
      <div className="resize-handles__wrapper">
        <div className="resize-handles__top-left"></div>
        <div className="resize-handles__top-center"></div>
        <div className="resize-handles__top-right"></div>
        <div className="resize-handles__right-middle"></div>
        <div className="resize-handles__bottom-right"></div>
        <div className="resize-handles__bottom-center"></div>
        <div className="resize-handles__bottom-left"></div>
        <div className="resize-handles__left-middle"></div>
      </div>
    )
  }
}

ResizeHandles.propTypes = {
  artboardId : PropTypes.number.isRequired,
  layerId : PropTypes.number.isRequired
}

export default ResizeHandles