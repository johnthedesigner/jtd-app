import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { mapProject } from '../../../utils/projectUtils'
import AdjustmentsPalette from './sidebar/AdjustmentsPalette'
import ArtboardsPalette from './sidebar/ArtboardsPalette'
import EditorActionBar from './EditorActionBar'
import EditorWorkspace from './EditorWorkspace'
import idx from 'idx'

import './styles/editor.css'

class EditorView extends React.Component {
  render() {
    const {
      adjustLayers,
      Artboards,
      bumpLayers,
      deselectLayersArtboard,
      dragLayers,
      highlightLayer,
      highlights,
      Layers,
      match,
      Projects,
      resizeLayers,
      selectArtboard,
      selectGroup,
      selections,
      selectLayer,
      shiftSelectLayer,
      showHideLayer,
      toggleArtboardItem,
    } = this.props

    const mappedProject = mapProject(
      Projects[match.params.projectId],
      Artboards,
      Layers,
      selections,
      highlights
    );

    const adjustments = idx(mappedProject, _ => _.adjustments)

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
              bumpLayers={bumpLayers}
              dragLayers={dragLayers}
              highlightLayer={highlightLayer}
              resizeLayers={resizeLayers}
              selectArtboard={selectArtboard}
              selections={mappedProject.selections}
              selectGroup={selectGroup}
              selectLayer={selectLayer}
              shiftSelectLayer={shiftSelectLayer}/>
          </div>

          <div className='editor-view__sidebar'>
            <ArtboardsPalette
              artboards={mappedProject.artboards}
              highlightLayer={highlightLayer}
              match={match}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
              shiftSelectLayer={shiftSelectLayer}
              showHideLayer={showHideLayer}
              toggleArtboardItem={toggleArtboardItem}/>
            <AdjustmentsPalette
              adjustments={adjustments}
              adjustLayers={adjustLayers}
              layerIds={selections.layers}>
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