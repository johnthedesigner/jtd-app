import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { artboardColors } from './artboardColors'
import AdjustmentsPalette from './sidebar/AdjustmentsPalette'
import ArtboardsPalette from './sidebar/ArtboardsPalette'
import EditorActionBar from './EditorActionBar'
import EditorWorkspace from './EditorWorkspace'

import './styles/editor.css'

class EditorView extends React.Component {
  render() {

    const {
      Artboards,
      highlightLayer,
      highlights,
      Layers,
      match,
      Projects,
      selectArtboard,
      selectedLayer,
      selections,
      selectLayer,
      toggleArtboardItem,
      updateDimensions,
    } = this.props

    const { projectId } = match.params
    const mappedProject = {
        ...Projects[projectId],
        artboards: _.map(Projects[projectId].artboards, (artboard, index) => {
        const mappedArtboard = {
          ...Artboards[artboard],
          isSelected: (
            artboard === selections.artboardId && selections.layerId === null
          ),
          layerSelected: (
            artboard === selections.artboardId && selections.layerId != null
          ),
          artboardColor: artboardColors[index],
          layers: _.map(Artboards[artboard].layers, (layer) => {
            const mappedLayer = {
              ...Layers[layer],
              isSelected: (
                layer === selections.layerId
              ),
              isHighlighted: (
                layer === highlights.layerId
              )
            }
            return mappedLayer
          })
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
            selectArtboard(null, null)
          }}>
            <EditorActionBar/>
            <EditorWorkspace
              artboards={mappedProject.artboards}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              highlightLayer={highlightLayer}/>
          </div>

          <div className='editor-view__sidebar'>
            <ArtboardsPalette
              match={match}
              artboards={mappedProject.artboards}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              highlightLayer={highlightLayer}
              toggleArtboardItem={toggleArtboardItem}/>
            <AdjustmentsPalette
              selectedLayer={selectedLayer}
              updateDimensions={updateDimensions}/>
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