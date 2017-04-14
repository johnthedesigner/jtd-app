import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Layer from './layers/Layer'

class Artboard extends React.Component {
  render() {

    const { title, height, width, layers } = this.props

    const wrapperStyles = {
      width: width
    }

    const frameStyles = {
      width: width,
      height: height
    }

    return (
      <div className="artboard__wrapper" style={wrapperStyles}>
        <div className="artboard__header">{title}</div>
        <div className="artboard__frame" style={frameStyles}>
          {_.map(layers,(layer,index) => { return (
            <Layer key={index} layer={layer}/>
          )})}
        </div>
      </div>
    )
  }
}

Artboard.propTypes = {
  title: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  layers : PropTypes.object.isRequired
}

export default Artboard