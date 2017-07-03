import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import idx from 'idx'
import _ from 'lodash'
import {mouseTrap} from 'react-mousetrap'

import { mapProject } from '../../../utils/projectUtils'
import AdjustmentsPalette from './sidebar/AdjustmentsPalette'
import Artboard from './Artboard'
import ArtboardsPalette from './sidebar/ArtboardsPalette'
import EditorActionBar from './EditorActionBar'
import Layer from './layers/Layer'
import SelectionControl from './layers/SelectionControl'

import './styles/editor.css'

class EditorView extends React.Component {
  componentWillMount() {
    const {
      bindShortcut,
      bumpLayers,
      copyLayers,
      deleteLayers,
      pasteLayers,
      toggleArtboardOptions,
    } = this.props
    // Set up key commands
    bindShortcut('shift+up', () => {bumpLayers('y',-10)})
    bindShortcut('shift+down', () => {bumpLayers('y',10)})
    bindShortcut('shift+left', () => {bumpLayers('x',-10)})
    bindShortcut('shift+right', () => {bumpLayers('x',10)})
    bindShortcut('up', () => {bumpLayers('y',-1)})
    bindShortcut('down', () => {bumpLayers('y',1)})
    bindShortcut('left', () => {bumpLayers('x',-1)})
    bindShortcut('right', () => {bumpLayers('x',1)})
    bindShortcut('backspace', () => {deleteLayers()})
    bindShortcut(['command+c','control+c'], () => {copyLayers()})
    bindShortcut(['command+v','control+v'], () => {pasteLayers()})
    bindShortcut('a', () => {toggleArtboardOptions()})
  }

  componentWillUnmount() {
    // Unbind shortcuts when unmounting
    this.props.unbindShortcut('shift+up')
    this.props.unbindShortcut('shift+down')
    this.props.unbindShortcut('shift+left')
    this.props.unbindShortcut('shift+right')
    this.props.unbindShortcut('up')
    this.props.unbindShortcut('down')
    this.props.unbindShortcut('left')
    this.props.unbindShortcut('right')
    this.props.unbindShortcut('backspace')
    this.props.unbindShortcut('a')
  }

  render() {
    const {
      addArtboard,
      addLayer,
      adjustLayers,
      Artboards,
      bumpLayers,
      deleteLayers,
      deselectLayersArtboard,
      dragLayers,
      editorModes,
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
      updateText,
    } = this.props

    const mappedProject = mapProject(
      Projects[match.params.projectId],
      Artboards,
      Layers,
      selections,
      highlights
    )

    const adjustments = idx(mappedProject, _ => _.adjustments)

    const addLargeArtboard = () => {
      addArtboard(400, 200)
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
            <EditorActionBar
              addLayer={addLayer}
              projectId={match.params.projectId}/>
            <div className='editor-view__artboard-area'>
              {_.map(mappedProject.artboards,(artboard,index) => { return (
                <Artboard
                  {...artboard}
                  dragLayers={dragLayers}
                  key={index}
                  resizeLayers={resizeLayers}
                  selectArtboard={selectArtboard}
                  selections={mappedProject.selections}
                  highlightLayer={highlightLayer}>
                  {_.map(artboard.layers,(layer,index) => { return (
                    <Layer
                      adjustLayers={adjustLayers}
                      artboardColor={artboard.artboardColor}
                      bumpLayers={bumpLayers}
                      deleteLayers={deleteLayers}
                      dragLayers={dragLayers}
                      key={index}
                      layer={layer}
                      resizeLayers={resizeLayers}
                      selectedLayers={mappedProject.selections.layers}
                      selectLayer={selectLayer}
                      highlightLayer={highlightLayer}
                      updateText={updateText}/>
                  )})}
                  <SelectionControl
                    artboardId={artboard.id}
                    dimensions={artboard.selection.dimensions}
                    dragLayers={dragLayers}
                    isActive={artboard.selection.isActive}
                    resizeLayers={resizeLayers}/>
                </Artboard>
              )})}
            </div>
          </div>

          <div className='editor-view__sidebar'>
            {!editorModes.viewArtboardOptions ?
              (
                <div>
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
                    layerIds={selections.layers}/>
                </div>
              ) : (
                <div>
                  <p>Artboard Options</p>
                  <button
                    onClick={addLargeArtboard}>
                    New Artboard
                  </button>
                </div>
              )
            }
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

// Wrap EditorView in mouseTrap to track key events
export default mouseTrap(EditorView)