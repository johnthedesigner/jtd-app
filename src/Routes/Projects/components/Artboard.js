import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Layer from './layers/Layer'

class Artboard extends React.Component {
  render() {

    const {
      id,
      title,
      height,
      width,
      layers,
      selections,
      selectArtboard,
      selectLayer
    } = this.props

    const isArtboardSelected = () => {
      if (id === selections.artboardId) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    const wrapperStyles = {
      width: width
    }

    const frameStyles = {
      width: width,
      height: height
    }

    return (
      <div className='artboard__wrapper' style={wrapperStyles}>
        <div className='artboard__header' onClick={selectArtboard}>{title}</div>
        <div
          className={'artboard__frame' + isArtboardSelected()}
          style={frameStyles}
          onClick={() => selectArtboard(id)}>
          {_.map(layers,(layer,index) => { return (
            <Layer
              artboardId={id}
              key={index}
              layer={layer}
              selections={selections}
              selectLayer={selectLayer}/>
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
  layers : PropTypes.array.isRequired
}

export default Artboard