import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import idx from 'idx'
import _ from 'lodash'

import { mapProject } from '../../../utils/projectUtils'
import AdjustmentsPalette from './sidebar/AdjustmentsPalette'
import Artboard from './Artboard'
import ArtboardsPalette from './sidebar/ArtboardsPalette'
import EditorActionBar from './EditorActionBar'
import Layer from './layers/Layer'

import './styles/editor.css'

class EditorView extends React.Component {
  render() {
    const {
      addLayer,
      adjustLayers,
      Artboards,
      bumpLayers,
      deleteLayers,
      deselectLayersArtboard,
      dragLayers,
      highlightLayer,
      highlights,
      Layers,
      match,
      Projects,
      resizeLayers,
      selectArtboard,
      selections,
      selectLayer,
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
            <EditorActionBar
              addLayer={addLayer}
              projectId={match.params.projectId}/>
            {_.map(mappedProject.artboards,(artboard,index) => { return (
              <Artboard
                {...artboard}
                key={index}
                selectArtboard={selectArtboard}
                selections={mappedProject.selections}
                highlightLayer={highlightLayer}>
                {_.map(artboard.layers,(layer,index) => { return (
                  <Layer
                    artboardColor={artboard.artboardColor}
                    bumpLayers={bumpLayers}
                    deleteLayers={deleteLayers}
                    dragLayers={dragLayers}
                    key={index}
                    layer={layer}
                    resizeLayers={resizeLayers}
                    selectedLayers={mappedProject.selections.layers}
                    selectLayer={selectLayer}
                    highlightLayer={highlightLayer}/>
                )})}
              </Artboard>
            )})}
          </div>

          <div className='editor-view__sidebar'>
            <ArtboardsPalette
              artboards={mappedProject.artboards}
              highlightLayer={highlightLayer}
              match={match}
              selectArtboard={selectArtboard}
              selectLayer={selectLayer}
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