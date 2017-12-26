import { connect } from "react-redux";
import _ from "lodash";

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
  updateText
} from "../actions";

import ArtboardWrapper from "../components/ArtboardWrapper";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addArtboard: (width, height, x, y) => {
      dispatch(addArtboard(width, height, x, y));
    },
    addLayer: layerType => {
      dispatch(addLayer(ownProps.artboardId, layerType));
    },
    adjustLayers: (adjustmentGroup, key, value) => {
      dispatch(adjustLayers(ownProps.artboardId, adjustmentGroup, key, value));
    },
    bumpLayers: (axis, distance) => {
      dispatch(bumpLayers(ownProps.artboardId, axis, distance));
    },
    copyLayers: () => {
      dispatch(copyLayers(ownProps.artboardId));
    },
    deleteLayers: () => {
      dispatch(deleteLayers(ownProps.artboardId));
    },
    deselectLayersArtboard: () => {
      dispatch(deselectLayersArtboard(ownProps.artboardId));
    },
    dragLayers: (layerId, x, y, previewOnly) => {
      dispatch(dragLayers(ownProps.artboardId, layerId, x, y, previewOnly));
    },
    enableTextEditor: layerId => {
      dispatch(enableTextEditor(ownProps.artboardId, layerId));
    },
    highlightLayer: layerId => {
      dispatch(highlightLayer(layerId));
    },
    moveLayers: direction => {
      dispatch(moveLayers(ownProps.artboardId, direction));
    },
    pasteLayers: () => {
      dispatch(pasteLayers(ownProps.artboardId));
    },
    rotateLayer: degrees => {
      dispatch(rotateLayer(ownProps.artboardId, degrees));
    },
    scaleLayer: (scaleDirectives, previewOnly) => {
      dispatch(scaleLayer(ownProps.artboardId, scaleDirectives, previewOnly));
    },
    selectLayer: (layerId, shiftKey) => {
      dispatch(selectLayer(ownProps.artboardId, layerId, shiftKey));
    },
    toggleFlyout: flyoutId => {
      dispatch(toggleFlyout(ownProps.artboardId, flyoutId));
    },
    updateText: text => {
      dispatch(updateText(ownProps.artboardId, text));
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  caseStudies: state.CaseStudies.caseStudies,
  artboardId: ownProps.artboardId,
  featured: ownProps.featured
});

const ArtboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  ArtboardWrapper
);

export default ArtboardContainer;
