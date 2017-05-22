import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import idx from 'idx'

import Layer from './Layer'

class GroupLayer extends React.Component {
  render() {
    const {
      artboardColor,
      artboardId,
      bumpLayers,
      highlightLayer,
      selectedLayers,
      selectGroup,
      selectLayer,
      group,
    } = this.props

    const layers = idx(group, _ => _.layers)

    return (
      <div className="group__wrapper">
        {_.map(layers,(layer,index) => { return (
          <Layer
            artboardColor={artboardColor}
            artboardId={artboardId}
            bumpLayers={bumpLayers}
            parentId={group.id}
            parentGroupIsSelected={group.groupIsSelected}
            parentSelected={group.isSelected}
            key={index}
            layer={layer}
            selectedLayers={selectedLayers}
            selectGroup={selectGroup}
            selectLayer={selectLayer}
            highlightLayer={highlightLayer}/>
        )})}
      </div>
    )
  }
}

GroupLayer.propTypes = {
  group : PropTypes.object.isRequired
}

export default GroupLayer