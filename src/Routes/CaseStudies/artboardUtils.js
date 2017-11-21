import _ from 'lodash'

import { mergeAdjustments } from './mergeAdjustments'

// Scale an individual Dimension for artboard resizing
export const scaleDimension = (dimension, scaleFactor) => {
  return dimension * scaleFactor
}

// Unscale an individual Dimension for artboard resizing
export const unscaleDimension = (dimension, scaleFactor) => {
  return Math.round(Math.round((dimension / scaleFactor) / 1) * 1)
}

// Scale full set of layer dimensions for artboard resizing
export const scaleAllDimensions = (dimensions, scaleFactor, scaleIn) => {
  let { x, y, width, height, rotation } = dimensions
  function scale(dimension) {
    if (scaleIn) {
      return scaleDimension(dimension,scaleFactor)
    } else {
      return unscaleDimension(dimension,scaleFactor)
    }
  }
  return {
    x: scale(x),
    y: scale(y),
    width: scale(width),
    height: scale(height),
    rotation,
  }
}

// Get full set of collective dimenions from a set of layers
// If no layers are supplied, return 0 for all dimensions
export const getLayerDimensions = (layers) => {
  let x = (layers[0] ? _.first(_.orderBy(_.map(layers, (layer) => {
    return layer.dimensions.x
  }))) : 0)

  let y = (layers[0] ? _.first(_.orderBy(_.map(layers, (layer) => {
    return layer.dimensions.y
  }))) : 0)

  let width = (layers[0] ? _.last(_.orderBy(_.map(layers, (layer) => {
    return (layer.dimensions.x - x + layer.dimensions.width)
  }))) : 0)

  let height = (layers[0] ? _.last(_.orderBy(_.map(layers, (layer) => {
    return (layer.dimensions.y - y + layer.dimensions.height)
  }))) : 0)

  let rotation = ( layers.length !== 1 ) ? 0 : layers[0].dimensions.rotation

  return { x, y, width, height, rotation }
}

// Map state to layers
let mapLayers = (layers, selections) => {
  return _.keyBy(_.map(layers, (layer) => {
    return {
      ...layer,
      isSelected: _.includes(selections, layer.id),
      adjustments: {
        ...layer.adjustments,
        dimensions: layer.dimensions
      }
    }
  }), 'id')
}

export const mapArtboard = (artboard) => {
  let selectedLayers = _.filter(artboard.layers, (layer) => {
    return _.includes(artboard.selections, layer.id)
  })
  return {
    ...artboard,
    isSelected: (selectedLayers.length > 0),
    layerSelected: (
      _.intersection(artboard.selections, artboard.layers).length > 0
    ),
    layers: mapLayers(artboard.layers, artboard.selections),
    selection: {
      isActive: (selectedLayers.length > 0),
      adjustments: mergeAdjustments(selectedLayers),
      dimensions: getLayerDimensions(selectedLayers)
    }
  }
}
