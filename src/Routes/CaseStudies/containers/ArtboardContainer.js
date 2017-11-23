import { connect } from 'react-redux'
import _ from 'lodash'

import {
  addArtboard,
  addLayer,
  adjustLayers,
  bumpLayers,
  copyLayers,
  deleteLayers,
  deselectLayersArtboard,
  dragLayers,
  enableTextEditor,
  highlightLayer,
  moveLayers,
  pasteLayers,
  rotateLayer,
  scaleLayer,
  selectLayer,
  toggleFlyout,
  updateText,
} from '../actions'

import ArtboardWrapper from '../components/ArtboardWrapper'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addArtboard: (width, height, x, y) => {
      dispatch(addArtboard(width, height, x, y))
    },
    addLayer: (layerType) => {
      dispatch(addLayer(ownProps.caseStudyId, layerType))
    },
    adjustLayers: (adjustmentGroup, key, value) => {
      dispatch(adjustLayers(ownProps.caseStudyId, adjustmentGroup, key, value))
    },
    bumpLayers: (axis, distance) => {
      dispatch(bumpLayers(ownProps.caseStudyId, axis, distance))
    },
    copyLayers: () => {
      dispatch(copyLayers(ownProps.caseStudyId))
    },
    deleteLayers: () => {
      dispatch(deleteLayers(ownProps.caseStudyId))
    },
    deselectLayersArtboard: () => {
      dispatch(deselectLayersArtboard(ownProps.caseStudyId))
    },
    dragLayers: (layerId, x, y) => {
      dispatch(dragLayers(ownProps.caseStudyId, layerId, x, y))
    },
    enableTextEditor: (layerId) => {
      dispatch(enableTextEditor(ownProps.caseStudyId, layerId))
    },
    highlightLayer: (layerId) => {
      dispatch(highlightLayer(layerId))
    },
    moveLayers: (direction) => {
      dispatch(moveLayers(ownProps.caseStudyId, direction))
    },
    pasteLayers: () => {
      dispatch(pasteLayers(ownProps.caseStudyId))
    },
    rotateLayer: (degrees) => {
      dispatch(rotateLayer(ownProps.caseStudyId, degrees))
    },
    scaleLayer: (scaleDirectives, previewOnly) => {
      dispatch(scaleLayer(ownProps.caseStudyId, scaleDirectives, previewOnly))
    },
    selectLayer: (layerId, shiftKey) => {
      dispatch(selectLayer(ownProps.caseStudyId, layerId, shiftKey))
    },
    toggleFlyout: (flyoutId) => {
      dispatch(toggleFlyout(ownProps.caseStudyId, flyoutId))
    },
    updateText: (text) => {
      dispatch(updateText(ownProps.caseStudyId, text))
    },
  }
}

const mapStateToProps = (state, ownProps) => ({
  caseStudies: state.CaseStudies.caseStudies,
  caseStudyId: ownProps.caseStudyId,
  featured: ownProps.featured,
})

const ArtboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtboardWrapper)

export default ArtboardContainer
