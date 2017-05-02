import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import LayerListItem from './LayerListItem'

class SubLayerGroup extends React.Component {
  render() {

    const {
      artboardColor,
      artboardId,
      highlightLayer,
      layers,
      selectLayer,
      showHideLayer,
    } = this.props

    return (
      <div className='sublayer-group__wrapper'>
        {_.map(layers,(layer,index) => { return (
          <LayerListItem
            artboardColor={artboardColor}
            artboardId={artboardId}
            key={index}
            layer={layer}
            selectLayer={selectLayer}
            showHideLayer={showHideLayer}
            highlightLayer={highlightLayer}/>
        )})}
      </div>
    )
  }
}

SubLayerGroup.propTypes = {
  layers: PropTypes.array.isRequired
}

export default SubLayerGroup