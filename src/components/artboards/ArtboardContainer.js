import { connect } from "react-redux";
import _ from "lodash";

import {
  addLayer,
  adjustLayers,
  bumpLayers,
  copyLayers,
  deleteLayers,
  deselectLayers,
  dragLayers,
  enableTextEditor,
  highlightLayer,
  moveLayers,
  pasteLayers,
  rotateLayer,
  scaleLayer,
  selectLayer,
  toggleImagePicker,
  undoAction,
  updateText
} from "../../store/actions";

import ArtboardWrapper from "./ArtboardWrapper";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addLayer: (layerType, image) => {
      dispatch(addLayer(ownProps.artboardId, layerType, image));
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
    deselectLayers: () => {
      dispatch(deselectLayers(ownProps.artboardId));
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
    toggleImagePicker: () => {
      dispatch(toggleImagePicker(ownProps.artboardId));
    },
    undoAction: () => {
      dispatch(undoAction(ownProps.artboardId));
    },
    updateText: text => {
      dispatch(updateText(ownProps.artboardId, text));
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  artboards: state.Content.artboards,
  artboardId: ownProps.artboardId,
  featured: ownProps.featured
});

const ArtboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  ArtboardWrapper
);

export default ArtboardContainer;
