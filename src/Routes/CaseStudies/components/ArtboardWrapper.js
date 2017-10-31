import React from 'react'
import PropTypes from 'prop-types'
import idx from 'idx'
import _ from 'lodash'
import { mouseTrap } from 'react-mousetrap'

import { mapArtboard } from '../artboardUtils'
import AdjustmentsFlyouts from './adjustments/AdjustmentsFlyouts'
import Artboard from './Artboard'
import ActionBars from './ActionBars'
import Layer from './layers/Layer'
import DragControl from './layers/DragControl'
import ResizeControl from './layers/ResizeControl'
import {
  scaleDimension,
  unscaleDimension,
  scaleAllDimensions
} from '../artboardUtils'

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
    bindShortcut('shift+up', (e) => {
      e.preventDefault()
      bumpLayers('y',-10)
    })
    bindShortcut('shift+down', (e) => {
      e.preventDefault()
      bumpLayers('y',10)
    })
    bindShortcut('shift+left', (e) => {
      e.preventDefault()
      bumpLayers('x',-10)
    })
    bindShortcut('shift+right', (e) => {
      e.preventDefault()
      bumpLayers('x',10)
    })
    bindShortcut('up', (e) => {
      e.preventDefault()
      bumpLayers('y',-1)
    })
    bindShortcut('down', (e) => {
      e.preventDefault()
      bumpLayers('y',1)
    })
    bindShortcut('left', (e) => {
      e.preventDefault()
      bumpLayers('x',-1)
    })
    bindShortcut('right', (e) => {
      e.preventDefault()
      bumpLayers('x',1)
    })
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
      addLayer,
      adjustLayers,
      caseStudies,
      caseStudyId,
      deselectLayersArtboard,
      dragLayers,
      featured,
      highlightLayer,
      moveLayers,
      resizeLayers,
      selectLayer,
      toggleFlyout,
    } = this.props

    const mappedArtboard = mapArtboard(caseStudies[caseStudyId])

    const adjustments = idx(mappedArtboard, _ => _.selection.adjustments)

    const selectionDimensions = idx(mappedArtboard, _ => _.selection.dimensions)

    let bgGradientStart = featured ?
      mappedArtboard.featuredStyles.bgGradientStart :
      'transparent'
    let bgGradientEnd = featured ?
      mappedArtboard.featuredStyles.bgGradientEnd :
      'transparent'
    let titleColor = featured ?
      mappedArtboard.featuredStyles.titleColor :
      mappedArtboard.nonfeaturedStyles.titleColor
    let excerptColor = featured ?
      mappedArtboard.featuredStyles.excerptColor :
      '#222'
    let buttonFill = featured ?
      mappedArtboard.featuredStyles.buttonFill :
      mappedArtboard.nonfeaturedStyles.buttonFill

    let artboardWrapperStyles = {
      background: `linear-gradient(to right, ${bgGradientStart}, ${bgGradientEnd})`
    }
    let titleStyles = {
      color: titleColor
    }
    let excerptStyles = {
      color: excerptColor
    }

    return (
      <div
        className='artboard__wrapper'
        id={`artboard-wrapper-${caseStudyId}`}
        style={artboardWrapperStyles}>
        <div className='editor-view__main-area' onClick={() => {
          deselectLayersArtboard(mappedArtboard.id)
        }}>
          <div className='editor-view__artboard-area'>
            <div className='editor-view__copy-area'>
              <div className='editor-view__copy'>
                <h1 style={titleStyles}>{mappedArtboard.title}</h1>
                <div style={excerptStyles}>
                  <p>{mappedArtboard.excerpt}</p>
                </div>
              </div>
            </div>
            <Artboard
              {...mappedArtboard}
              highlightLayer={highlightLayer}
              key={mappedArtboard.id}
              scaleFactor={this.state.scaleFactor}
              deselectLayersArtboard={deselectLayersArtboard}>
              <div>
                <svg
                  width={scaleDimension(1000, this.state.scaleFactor)}
                  height={scaleDimension(1000, this.state.scaleFactor)}
                  viewBox="0 0 1000 1000"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}>
                  {_.map(_.orderBy(mappedArtboard.layers,'order'),(layer,index) => {
                    return (
                    <Layer
                      adjustLayers={adjustLayers}
                      dragLayers={dragLayers}
                      highlightLayer={highlightLayer}
                      key={layer.id}
                      layer={layer}
                      selectLayer={selectLayer}
                      scaleFactor={this.state.scaleFactor}
                      scaleDimension={scaleDimension}
                      scaleAllDimensions={scaleAllDimensions}
                      unscaleDimension={unscaleDimension}/>
                  )})}
                </svg>
                {_.map(_.orderBy(mappedArtboard.layers,'order'),(layer,index) => { return (
                  <DragControl
                    adjustLayers={adjustLayers}
                    dragLayers={dragLayers}
                    highlightLayer={highlightLayer}
                    key={layer.id}
                    layer={layer}
                    selectLayer={selectLayer}
                    scaleFactor={this.state.scaleFactor}/>
                )})}
                <ResizeControl
                  caseStudyId={mappedArtboard.id}
                  dimensions={mappedArtboard.selection.dimensions}
                  isActive={mappedArtboard.selection.isActive}
                  resizeLayers={resizeLayers}
                  scaleFactor={this.state.scaleFactor}/>
              </div>
              <div className='artboard__action-bar'>
                <ActionBars
                  adjustments={adjustments}
                  adjustLayers={adjustLayers}
                  addLayer={addLayer}
                  buttonFill={buttonFill}
                  caseStudyId={caseStudyId}
                  layerIds={mappedArtboard.selection.layers}
                  moveLayers={moveLayers}
                  toggleFlyout={toggleFlyout}/>
              </div>
              <AdjustmentsFlyouts
                adjustments={adjustments}
                adjustLayers={adjustLayers}
                activeFlyout={mappedArtboard.activeFlyout}
                caseStudyId={caseStudyId}
                dimensions={selectionDimensions}
                resizeLayers={resizeLayers}
                toggleFlyout={toggleFlyout}/>
            </Artboard>
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