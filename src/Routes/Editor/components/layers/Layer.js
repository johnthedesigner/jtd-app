import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'
import idx from 'idx'

import { layerTypes } from '../../../../store/entities/Layers'
import ImageLayer from './ImageLayer'
import GroupLayer from './GroupLayer'
import RectangleLayer from './RectangleLayer'
import TextLayer from './TextLayer'

class Layer extends React.Component {
  render() {

    const layerType = (layer, layerStyles) => {
      switch (layer.type) {
        case layerTypes.image:
          return ( <ImageLayer layer={layer} layerStyles={layerStyles}/> )

        case layerTypes.group:
          return ( <GroupLayer group={layer}
            {...this.props}
            layerStyles={layerStyles}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer layer={layer} layerStyles={layerStyles}/> )

        case layerTypes.text:
          return ( <TextLayer layer={layer} layerStyles={layerStyles}/> )

        default:
          console.log('Unrecognized layer type')
      }
    }

    const {
      artboardColor,
      parentId,
      parentSelected,
      parentGroupIsSelected,
      layer,
      highlightLayer,
      selectGroup,
      selectLayer,
    } = this.props

    const layerStyles = {
      marginLeft: idx(layer, _ => _.adjustments.dimensions.x) + 'px',
      marginTop: idx(layer, _ => _.adjustments.dimensions.y) + 'px',
      width: idx(layer, _ => _.adjustments.dimensions.width)
        * idx(layer, _ => _.adjustments.dimensions.scaleX) + 'px',
      height: idx(layer, _ => _.adjustments.dimensions.height)
        * idx(layer, _ => _.adjustments.dimensions.scaleY) + 'px',
      transform: 'rotate(' + idx(layer, _ => _.adjustments.dimensions.rotation)
        + 'deg)',
      userSelect: 'none'
    }

    const highlightStyles = {
      ...layerStyles,
      borderColor: artboardColor,
      boxShadow: '0 0 0 4px ' + Color(artboardColor).fade(0.7)
    }

    const toggleSelected = () => {
      return (layer.isSelected) ? ' is-selected' : ''
    }

    const toggleHighlighted = () => {
      return (layer.isHighlighted) ? ' is-highlighted' : ''
    }

    const toggleHidden = () => {
      return (layer.hide) ? ' is-hidden' : ''
    }

    return (
      <div
        className={
          'layer__wrapper'
          + toggleSelected()
          + toggleHighlighted()
          + toggleHidden()
        }
        onClick={(e) => {
          e.stopPropagation()
          if (parentGroupIsSelected) {
            selectLayer(layer.id, e.shiftKey)
          } else if ((!layer.isSelected && !parentSelected) || e.shiftKey) {
            selectLayer(((parentId) ? parentId : layer.id), e.shiftKey)
          }
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          if (parentId) {
            highlightLayer(layer.id)
            selectLayer(layer.id)
            selectGroup(parentId)
          }
        }}
        onMouseEnter={() => {
          if (parentGroupIsSelected) {
            highlightLayer(layer.id)
          } else {
            highlightLayer(((parentId) ? parentId : layer.id))
          }
        }}
        onMouseLeave={() => {
          highlightLayer(null)
        }}>
        {layerType(layer, layerStyles)}
        <div className='layer__highlight-indicator' style={highlightStyles}></div>
      </div>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
}

export default Layer