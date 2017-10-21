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
  pasteLayers,
  resizeLayers,
  selectLayer,
} from '../actions'

import ArtboardWrapper from '../components/ArtboardWrapper'
import '../styles/editor.css'

const mapDispatchToProps = (dispatch) => {
  return {
    addArtboard: (width, height, x, y) => {
      dispatch(addArtboard(width, height, x, y))
    },
    addLayer: (layerType) => {
      dispatch(addLayer(layerType))
    },
    adjustLayers: (layerIds, adjustmentGroup, key, value) => {
      dispatch(adjustLayers(layerIds, adjustmentGroup, key, value))
    },
    bumpLayers: (layerIds, axis, sign, shiftKey) => {
      dispatch(bumpLayers(layerIds, axis, sign, shiftKey))
    },
    copyLayers: () => {
      dispatch(copyLayers())
    },
    deleteLayers: (layerIds) => {
      dispatch(deleteLayers(layerIds))
    },
    deselectLayersArtboard: (caseStudyId) => {
      dispatch(deselectLayersArtboard(caseStudyId))
    },
    dragLayers: (layerId, x, y) => {
      dispatch(dragLayers(layerId, x, y))
    },
    highlightLayer: (layerId) => {
      dispatch(highlightLayer(layerId))
    },
    pasteLayers: () => {
      dispatch(pasteLayers())
    },
    resizeLayers: (layerIds, delta, xOffset, yOffset) => {
      dispatch(resizeLayers(layerIds, delta, xOffset, yOffset))
    },
    selectLayer: (caseStudyId, layerId, shiftKey) => {
      dispatch(selectLayer(caseStudyId, layerId, shiftKey))
    },
  }
}

const mapStateToProps = (state, ownProps) => ({
  caseStudies: state.CaseStudies.caseStudies,
  caseStudyId: ownProps.caseStudyId
})

const ArtboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtboardWrapper)

export default ArtboardContainer
