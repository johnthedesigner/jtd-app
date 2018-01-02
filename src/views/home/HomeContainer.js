import { connect } from "react-redux";

import {
  bumpLayers,
  copyLayers,
  deleteLayers,
  deselectLayers,
  pasteLayers,
  undoAction
} from "../../store/actions";
import HomeView from "./HomeView";

const mapDispatchToProps = dispatch => {
  return {
    bumpLayers: (artboardId, axis, distance) => {
      dispatch(bumpLayers(artboardId, axis, distance));
    },
    copyLayers: artboardId => {
      dispatch(copyLayers(artboardId));
    },
    deleteLayers: artboardId => {
      dispatch(deleteLayers(artboardId));
    },
    deselectLayers: artboardId => {
      dispatch(deselectLayers(artboardId));
    },
    pasteLayers: artboardId => {
      dispatch(pasteLayers(artboardId));
    },
    undoAction: artboardId => {
      dispatch(undoAction(artboardId));
    }
  };
};

const mapStateToProps = state => {
  return {
    Artboards: state.Content.artboards,
    currentArtboardId: state.Content.currentArtboardId
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomeContainer;
