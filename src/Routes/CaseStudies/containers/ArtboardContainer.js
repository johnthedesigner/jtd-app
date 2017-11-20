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
  highlightLayer,
  moveLayers,
  pasteLayers,
  resizeLayers,
  scaleLayer,
  selectLayer,
  toggleFlyout,
} from '../actions'

import ArtboardWrapper from '../components/ArtboardWrapper'
import '../styles/editor.css'

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
    bumpLayers: (axis, sign) => {
      dispatch(bumpLayers(ownProps.caseStudyId, axis, sign))
    },
    copyLayers: () => {
      dispatch(copyLayers())
    },
    deleteLayers: (layerIds) => {
      dispatch(deleteLayers(layerIds))
    },
    deselectLayersArtboard: () => {
      dispatch(deselectLayersArtboard(ownProps.caseStudyId))
    },
    dragLayers: (layerId, x, y) => {
      dispatch(dragLayers(ownProps.caseStudyId, layerId, x, y))
    },
    highlightLayer: (layerId) => {
      dispatch(highlightLayer(layerId))
    },
    moveLayers: (direction) => {
      dispatch(moveLayers(ownProps.caseStudyId, direction))
    },
    pasteLayers: () => {
      dispatch(pasteLayers())
    },
    resizeLayers: (delta, xOffset, yOffset, resizeType) => {
      dispatch(
        resizeLayers(ownProps.caseStudyId, delta, xOffset, yOffset, resizeType)
      )
    },
    scaleLayer: (scaleDirectives, previewOnly) => {
      dispatch(scaleLayer(ownProps.caseStudyId, scaleDirectives, previewOnly))
    },
    selectLayer: (layerId, shiftKey) => {
      dispatch(selectLayer(ownProps.caseStudyId, layerId, shiftKey))
    },
    toggleFlyout: (flyoutId) => {
      dispatch(toggleFlyout(ownProps.caseStudyId, flyoutId))
    }
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
