import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import idx from 'idx'
import _ from 'lodash'
import {mouseTrap} from 'react-mousetrap'

import { mapArtboards } from '../../../utils/projectUtils'
import AdjustmentsPalette from './AdjustmentsPalette'
import Artboard from './Artboard'
import ActionBar from './ActionBar'
import Layer from './layers/Layer'
import SelectionControl from './layers/SelectionControl'

import './styles/artboards.css'

class ArtboardsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scaleFactor: 1
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

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

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
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

  updateDimensions() {
    let wrapper = document.getElementById('artboards-wrapper')
    let width = wrapper.clientWidth * (2/3) // Limit artboard to 2/3 column
    let height = wrapper.clientHeight
    this.setState({scaleFactor: (_.min([width,height]) * .8) / 1000})
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
      highlightLayer,
      highlights,
      Layers,
      resizeLayers,
      selectArtboard,
      selections,
      selectLayer,
      updateText,
    } = this.props

    const mappedArtboards = mapArtboards(
      Artboards,
      Layers,
      selections,
      highlights
    )

    const adjustments = idx(mappedArtboards, _ => _.adjustments)

    return (
      <div className='editor-view__wrapper' id='artboards-wrapper'>

        <div className='editor-view__tab-bar'>
          <Link to='/'>Home</Link>{' | '}<Link to='/Projects'>Projects</Link>
        </div>

        <div className='editor-view__body'>

          <div className='editor-view__main-area' onClick={() => {
            deselectLayersArtboard()
          }}>
            <ActionBar
              addArtboard={addArtboard}
              addLayer={addLayer}/>
            <div className='artboards-view__artboard-list'>
              {_.map(mappedArtboards.artboards,(artboard,index) => { return (
                <Artboard
                  {...artboard}
                  dragLayers={dragLayers}
                  key={index}
                  resizeLayers={resizeLayers}
                  selectArtboard={selectArtboard}
                  selections={mappedArtboards.selections}
                  highlightLayer={highlightLayer}
                  scaleFactor={this.state.scaleFactor}>
                  {_.map(artboard.layers,(layer,index) => { return (
                    <Layer
                      adjustLayers={adjustLayers}
                      artboardColor={artboard.artboardColor}
                      bumpLayers={bumpLayers}
                      deleteLayers={deleteLayers}
                      dragLayers={dragLayers}
                      key={index}
                      layer={layer}
                      fill={layer.adjustments.fill.color}
                      resizeLayers={resizeLayers}
                      selectedLayers={mappedArtboards.selections.layers}
                      selectLayer={selectLayer}
                      highlightLayer={highlightLayer}
                      updateText={updateText}
                      scaleFactor={this.state.scaleFactor}/>
                  )})}
                  <SelectionControl
                    artboardId={artboard.id}
                    dimensions={artboard.selection.dimensions}
                    dragLayers={dragLayers}
                    isActive={artboard.selection.isActive}
                    resizeLayers={resizeLayers}
                    scaleFactor={this.state.scaleFactor}/>
                </Artboard>
              )})}
            </div>
          </div>

          <div className='editor-view__sidebar'>
            <div>
              <AdjustmentsPalette
                adjustments={adjustments}
                adjustLayers={adjustLayers}
                layerIds={selections.layers}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ArtboardsView.propTypes = {
  Artboards: PropTypes.object.isRequired,
  deselectLayersArtboard: PropTypes.func.isRequired,
  highlights: PropTypes.object.isRequired,
  Layers: PropTypes.object.isRequired,
  selections: PropTypes.object.isRequired,
}

// Wrap EditorView in mouseTrap to track key events
export default mouseTrap(ArtboardsView)