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
      isSelected,
      layers,
      layerSelected,
      match,
      selectArtboard,
      selectLayer,
      title,
      toggleArtboardItem,
    } = this.props

    const toggleSelected = () => {
      return (isSelected) ? ' is-selected' : ''
    }

    const toggleLayerSelected = () => {
      return (layerSelected) ? ' layer-selected' : ''
    }

    const listItemClassNames = toggleSelected() + toggleLayerSelected()

    const artboardGroupStyles = {
      borderColor: artboardColor
    }

    return (
      <div
        style={artboardGroupStyles}
        className={'artboard-list-item__group-wrapper' + listItemClassNames}>
        <div className='artboard-list-item__item-wrapper'>
          <ActionIcon
            iconType={isCollapsed ? 'caret-right' : 'caret-down'}
            onClick={() => {
              toggleArtboardItem(match.params.projectId, id)
            }}/>
          <div
            className='artboard-list-item__label'
            onClick={() => selectArtboard(id)}>
            {title}
          </div>
          <ActionIcon iconType='dot-circle-o' className="artboard-list-item__layer-selected-indicator"/>
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