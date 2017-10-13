import _ from 'lodash'

import { mergeAdjustments } from './mergeAdjustments'

const artboardColors = [
  '#F77B71',
  '#95CA4E',
  '#31CBF0',
  '#F9E188',
  '#D25BEB',
  '#F4B380',
  '#50E3C2'
]

export const getDimensions = (layers) => {
  let x = _.first(_.orderBy(_.map(layers, (layer) => {
    return layer.adjustments.dimensions.x
  })))

  let y = _.first(_.orderBy(_.map(layers, (layer) => {
    return layer.adjustments.dimensions.y
  })))

  let width = _.last(_.orderBy(_.map(layers, (layer) => {
    return (layer.adjustments.dimensions.x
      - x + layer.adjustments.dimensions.width)
  })))

  let height = _.last(_.orderBy(_.map(layers, (layer) => {
    return (layer.adjustments.dimensions.y
      - y + layer.adjustments.dimensions.height)
  })))

  let dimensions = {
    x,
    y,
    width,
    height,
    scaleX: 1,
    scaleY: 1
  }

  return dimensions
}

// Map project to populate artboards and artboards palette
export const mapArtboards = (
  Artboards,
  Layers,
  selections,
  highlights
) => {

  // Merge all adjustments for selected layers
  const mergedAdjustments = mergeAdjustments(
    _.map(selections.layers, (layerId) => {
      return Layers[layerId].adjustments
    })
  )
  // For dimensions alone, get dimensions for all selected layers
  mergedAdjustments.dimensions = getDimensions(_.map(
    selections.layers,
    layerId => {
      return Layers[layerId]
    }
  ))

  // Layer Mapping
  let mapLayers = (layers) => {
    return _.map(layers, (layerId) => {
      if (Layers[layerId]) return {
        ...Layers[layerId],
        isSelected: _.includes(selections.layers, layerId),
        isHighlighted: (highlights.layerId === layerId),
        adjustments: {
          ...Layers[layerId].adjustments,
          dimensions: Layers[layerId].adjustments.dimensions
        }
      }
    })
  }

  // Artboard mapping
  let mappedArtboards = _.map(Artboards, (artboard, index) => {
    let validLayerIds = _.map(Layers,(layer)=> {return layer.id})
    let culledArtboardLayers = _.intersection(artboard.layers, validLayerIds)
    const mappedArtboardLayers = mapLayers(culledArtboardLayers)
    const getSelectedLayers = (layers) => {
      let selectedLayers = []
      _.forEach(layers, (layer) => {
        if (Layers[layer.id]) {
          if (layer.isSelected) {
            selectedLayers.push(layer)
          }
        }
      })
      return selectedLayers
    }
    let selectedLayers = getSelectedLayers(mappedArtboardLayers)

    const mappedArtboard = {
      ...artboard,
      isSelected: (artboard.id === selections.artboardId),
      layerSelected: (_.intersection(selections.layers, artboard.layers)
        .length > 0),
      artboardColor: artboardColors[0],
      layers: mappedArtboardLayers,
      selection: {
        isActive: (selectedLayers.length > 0),
        adjustments: mergedAdjustments,
        dimensions: getDimensions(selectedLayers)
      }
    }
    return mappedArtboard
  })

  return {
    adjustments: mergedAdjustments,
    artboards: mappedArtboards,
    selections
  }
}
