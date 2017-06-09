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

// Map project to populate artboards and artboards palette
export const mapProject = (
  Project,
  Artboards,
  Layers,
  selections,
  highlights
) => {

  // Merge adjustments for selected layers
  const mergedAdjustments = mergeAdjustments(
    _.map(selections.layers, (layerId) => {
      return Layers[layerId].adjustments
    })
  )

  // Calculate group dimensions or return layer dimensions
  let getDimensions = (layers, adjustments) => {
    if (adjustments) {
      return adjustments.dimensions

    } else if (layers) {
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

      return {
        x,
        y,
        width,
        height,
        scaleX: 1,
        scaleY: 1
      }
    }
  }

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
  let mappedArtboards = _.map(Project.artboards, (artboard, index) => {
    let artboardLayers = Artboards[artboard].layers
    let validLayerIds = _.map(Layers,(layer)=> {return layer.id})
    let culledArtboardLayers = _.intersection(artboardLayers, validLayerIds)
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
      ...Artboards[artboard],
      isSelected: (artboard === selections.artboardId),
      layerSelected: (_.intersection(selections.layers, artboard.layers)
        .length > 0),
      artboardColor: artboardColors[index],
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
    ...Project,
    adjustments: mergedAdjustments,
    artboards: mappedArtboards,
    selections
  }
}
