import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { artboardColors } from './artboardColors'
import AdjustmentsPalette from './sidebar/AdjustmentsPalette'
import ArtboardsPalette from './sidebar/ArtboardsPalette'
// import DimensionsAdjustment from './sidebar/adjustments/DimensionsAdjustment'
import EditorActionBar from './EditorActionBar'
import EditorWorkspace from './EditorWorkspace'
// import FillAdjustment from './sidebar/adjustments/FillAdjustment'

import './styles/editor.css'

class EditorView extends React.Component {
  render() {

    const {
      adjustLayer,
      Artboards,
      deselectLayersArtboard,
      highlightLayer,
      highlights,
      Layers,
      match,
      Projects,
      selectArtboard,
      selectedLayer,
      selections,
      selectGroup,
      selectLayer,
      shiftSelectLayer,
      showHideLayer,
      toggleArtboardItem,
    } = this.props
    const { projectId } = match.params

    // Calculate group dimensions or return layer dimensions
    const getDimensions = (layers, adjustments) => {
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
    const mapLayers = (layers) => {
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
            dimensions: getDimensions(subLayers, Layers[layerId].adjustments)
          }
        }
      })
    }

    // Map project to populate artboards and artboards palette
    const mappedProject = {
      ...Projects[projectId],
      artboards: _.map(Projects[projectId].artboards, (artboard, index) => {

        const artboardLayers = mapLayers(Artboards[artboard].layers)
        let selectedLayers = []
        const getSelectedLayers = (layerTree) => {
          _.forEach(layerTree, (layer) => {
            if (layer.isSelected) {
              selectedLayers.push(layer)
            }
            if (layer.layers.length > 0) getSelectedLayers(layer.layers)
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
            dimensions: getDimensions(getSelectedLayers(artboardLayers))
          }
        }
        return mappedArtboard
      })
    }

    return (
      <div className='editor-view__wrapper'>

        <div className='editor-view__tab-bar'>
          <Link to='/'>Home</Link>{' | '}<Link to='/Projects'>Projects</Link>
        </div>

        <div className='editor-view__body'>

          <div className='editor-view__main-area' onClick={() => {
            deselectLayersArtboard()
          }}>
            <EditorActionBar/>
            <EditorWorkspace
              artboards={mappedProject.artboards}
              selectArtboard={selectArtboard}
              selectGroup={selectGroup}
              selectLayer={selectLayer}
              shiftSelectLayer={shiftSelectLayer}
              highlightLayer={highlightLayer}/>
          </div>

          <div className='editor-view__sidebar'>
            <ArtboardsPalette
              match={match}
              artboards={mappedProject.artboards}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              shiftSelectLayer={shiftSelectLayer}
              showHideLayer={showHideLayer}
              highlightLayer={highlightLayer}
              toggleArtboardItem={toggleArtboardItem}/>
            <AdjustmentsPalette
              selectedLayers={selectedLayer}
              adjustLayer={adjustLayer}>
            </AdjustmentsPalette>
          </div>
        </div>
      </div>
    )
  }
}

EditorView.propTypes = {
  Artboards: PropTypes.object.isRequired,
  highlights: PropTypes.object.isRequired,
  Layers: PropTypes.object.isRequired,
  Projects: PropTypes.object.isRequired,
  selectArtboard: PropTypes.func.isRequired,
  selections: PropTypes.object.isRequired,
}

export default EditorView