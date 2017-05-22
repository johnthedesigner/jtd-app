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
  constructor(props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        this.props.bumpLayers(this.props.selectedLayers,'y',-1,e.shiftKey)
        break

      case 'ArrowDown':
      this.props.bumpLayers(this.props.selectedLayers,'y',1,e.shiftKey)
        break

      case 'ArrowLeft':
      this.props.bumpLayers(this.props.selectedLayers,'x',-1,e.shiftKey)
        break

      case 'ArrowRight':
      this.props.bumpLayers(this.props.selectedLayers,'x',1,e.shiftKey)
        break

      default:
        // console.log(e.key)
    }
  }

  handleFocus(e) {
    // e.target.click()
  }

  render() {
    const layerType = (layer, layerScaleStyles) => {
      switch (layer.type) {
        case layerTypes.image:
          return ( <ImageLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.group:
          return ( <GroupLayer
            group={layer}
            bumpLayers={this.props.bumpLayers}
            {...this.props}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.rectangle:
          return ( <RectangleLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

        case layerTypes.text:
          return ( <TextLayer
            layer={layer}
            layerScaleStyles={layerScaleStyles}/> )

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

    const layerScaleStyles = {
      width: idx(layer, _ => _.adjustments.dimensions.width)
        * idx(layer, _ => _.adjustments.dimensions.scaleX) + 'px',
      height: idx(layer, _ => _.adjustments.dimensions.height)
        * idx(layer, _ => _.adjustments.dimensions.scaleY) + 'px',
    }

    const layerShapeStyles = {
      ...layerScaleStyles,
      marginLeft: idx(layer, _ => _.adjustments.dimensions.x) + 'px',
      marginTop: idx(layer, _ => _.adjustments.dimensions.y) + 'px',
      transform: 'rotate(' + idx(layer, _ => _.adjustments.dimensions.rotation)
        + 'deg)',
      userSelect: 'none'
    }
    const highlightStyles = {
      ...layerShapeStyles,
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
        <button
          className={'layer__shape layer__shape--' + layer.type}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          style={layerShapeStyles}>
          {layerType(layer, layerScaleStyles)}
        </button>
        <div className='layer__highlight-indicator' style={highlightStyles}></div>
      </div>
    )
  }
}

Layer.propTypes = {
  layer: PropTypes.object.isRequired,
}

export default Layer