import React from 'react'
import PropTypes from 'prop-types'
// import idx from 'idx'
import _ from 'lodash'
import {mouseTrap} from 'react-mousetrap'

import { mapArtboard } from '../artboardUtils'
// import AdjustmentsPalette from './AdjustmentsPalette'
import Artboard from './Artboard'
// import ActionBar from './ActionBar'
import Layer from './layers/Layer'
import SelectionControl from './layers/SelectionControl'

import './styles/artboards.css'
import './styles/editor.css'

class ArtboardWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scaleFactor: 1,
      shiftKey: false
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
  }

  updateDimensions() {
    // Get the dimensions of our artboards-wrapper
    let { caseStudyId } = this.props
    let wrapper = document.getElementById(`artboard-wrapper-${caseStudyId}`)
    let width = wrapper.clientWidth * (2/3) // Limit artboard to 2/3 column
    let height = wrapper.clientHeight
    // Determine correct artboard scale factor and store in component state
    this.setState({scaleFactor: (_.min([width,height]) * .90) / 1000})
  }

  render() {
    const {
      adjustLayers,
      caseStudies,
      caseStudyId,
      deselectLayersArtboard,
      dragLayers,
      highlightLayer,
      resizeLayers,
      selectLayer,
    } = this.props

    const mappedArtboard = mapArtboard(caseStudies[caseStudyId])

    // const adjustments = idx(mappedArtboard, _ => _.adjustments)

    return (
      <div
        id={`artboard-wrapper-${caseStudyId}`}>

        <div>

          <div className='editor-view__main-area' onClick={() => {
            deselectLayersArtboard(mappedArtboard.id)
          }}>
            <div className='editor-view__artboard-area'>
              <div className='editor-view__copy-area'>
                <div className='editor-view__copy'>
                  <h1>Lorem ipsum dolor sit amet</h1>
                  <p>I know, I just call her Annabelle cause she's shaped like a…she's the belle of the ball! I'm sure Egg is a great person. I've made a huge tiny mistake. What a fun, sexy time for you. Up yours, granny! You couldn't handle it! Fun and failure both start out the same way. Sister's my new mother, Mother. And is it just me or is she looking hotter?</p>
                </div>
              </div>
              <Artboard
                {...mappedArtboard}
                highlightLayer={highlightLayer}
                key={mappedArtboard.id}
                scaleFactor={this.state.scaleFactor}
                deselectLayersArtboard={deselectLayersArtboard}>
                {_.map(_.orderBy(mappedArtboard.layers,'order'),(layer,index) => { return (
                  <Layer
                    adjustLayers={adjustLayers}
                    caseStudyId={mappedArtboard.id}
                    dragLayers={dragLayers}
                    highlightLayer={highlightLayer}
                    key={layer.id}
                    layer={layer}
                    selectLayer={selectLayer}
                    scaleFactor={this.state.scaleFactor}/>
                )})}
                <SelectionControl
                  dimensions={mappedArtboard.selection.dimensions}
                  isActive={mappedArtboard.selection.isActive}
                  resizeLayers={resizeLayers}
                  scaleFactor={this.state.scaleFactor}/>
              </Artboard>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ArtboardWrapper.propTypes = {
  caseStudies: PropTypes.object.isRequired,
  bumpLayers: PropTypes.func.isRequired,
  caseStudyId: PropTypes.string.isRequired,
  copyLayers: PropTypes.func.isRequired,
  deleteLayers: PropTypes.func.isRequired,
  deselectLayersArtboard: PropTypes.func.isRequired,
  pasteLayers: PropTypes.func.isRequired,
}

// Wrap EditorView in mouseTrap to track key events
export default mouseTrap(ArtboardWrapper)