import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import LayerListItem from './LayerListItem'
import ActionIcon from '../../../../components/ActionIcon'

class ArtboardListItem extends React.Component {
  render() {

    const {
      artboardColor,
      highlightLayer,
      id,
      isCollapsed,
      layers,
      match,
      title,
      selectArtboard,
      selections,
      selectLayer,
      toggleArtboardItem,
    } = this.props

    const isArtboardSelected = () => {
      if (id === selections.artboardId && selections.layerId === null) {
        return ' is-selected'
      } else {
        return ' not-selected'
      }
    }

    const artboardGroupStyles = {
      borderColor: artboardColor
    }

    return (
      <div
        style={artboardGroupStyles}
        className={'artboard-list-item__group-wrapper' + isArtboardSelected()}>
        <div className='artboard-list-item__item-wrapper'>
          <ActionIcon
            iconType={isCollapsed ? 'angle-right' : 'angle-down'}
            onClick={() => {
              toggleArtboardItem(match.params.projectId, id)
            }}/>
          <div
            className='artboard-list-item__label'
            onClick={() => selectArtboard(id)}>
            {title}
          </div>
        </div>
        <div
          className='artboard-list-item__frame'
          onClick={() => selectArtboard(id)}>
          {isCollapsed ? '' : // TODO: expand and collapse transitions
            _.map(layers,(layer,index) => { return (
              <LayerListItem
                artboardColor={artboardColor}
                artboardId={id}
                key={index}
                layer={layer}
                selections={selections}
                selectLayer={selectLayer}
                highlightLayer={highlightLayer}/>
            )})}
        </div>
      </div>
    )
  }
}

ArtboardListItem.propTypes = {
  title: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  layers : PropTypes.array.isRequired
}

export default ArtboardListItem