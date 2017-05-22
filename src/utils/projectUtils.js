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

  // Recursive layer mapping for groups
  let mapLayers = (layers) => {
    return _.map(layers, (layerId) => {
      let subLayers = mapLayers(Layers[layerId].layers)
      return {
        ...Layers[layerId],
        isSelected: _.includes(selections.layers, layerId),
        isHighlighted: (highlights.layerId === layerId),
        groupIsSelected: (selections.groupId === layerId),
        layers: subLayers,
        adjustments: {
          ...Layers[layerId].adjustments,
          dimensions: (Layers[layerId].type === 'group') ?
            getDimensions(subLayers)
            : Layers[layerId].adjustments.dimensions
        }
      }
    })
  }

  return {
    ...Project,
    adjustments: {
      ...mergeAdjustments(_.map(selections.layers, (layerId) => {
        return Layers[layerId].adjustments
      }))
    },
    artboards: _.map(Project.artboards, (artboard, index) => {

      const artboardLayers = mapLayers(Artboards[artboard].layers)
      let selectedLayers = []
      const getSelectedLayers = (layerTree) => {
        _.forEach(layerTree, (layer) => {
          if (layer.isSelected) {
            selectedLayers.push(layer)
          }
          if (layer.layers.length > 0) {
            getSelectedLayers(layer.layers)
          }
        })
        return selectedLayers
      }

      const mappedArtboard = {
        ...Artboards[artboard],
        isSelected: (artboard === selections.artboardId),
        layerSelected: (_.intersection(selections.layers, artboard.layers)
          .length > 0),
        artboardColor: artboardColors[index],
        layers: artboardLayers,
        selection: {
          isActive: (getSelectedLayers(artboardLayers).length > 0),
          adjustments: {
            ...mergeAdjustments(_.map(selections.layers, (layerId) => {
              return Layers[layerId].adjustments
            }))
          },
          dimensions: getDimensions(getSelectedLayers(artboardLayers))
        }
      }
      return mappedArtboard
    }),
    selections
  }
}

export const getNestedLayers = (layers, layerId, ) => {
  var nestedLayerIds = []
  const recurseThroughLayers = (id) => {
    nestedLayerIds.push(id)
    if (layers[id].type === 'group') {
      _.each(layers[id].layers, nestedLayer => {
        recurseThroughLayers(nestedLayer)
      })
    }
  }
  recurseThroughLayers(layerId)
  return nestedLayerIds
}
