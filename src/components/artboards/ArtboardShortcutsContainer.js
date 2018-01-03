import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { mouseTrap } from "react-mousetrap";

import {
  bumpLayers,
  copyLayers,
  deleteLayers,
  pasteLayers,
  undoAction
} from "../../store/actions";

class ArtboardShortcutsWrapper extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      Artboards,
      bindShortcut,
      bumpLayers,
      copyLayers,
      currentArtboardId,
      deleteLayers,
      pasteLayers,
      undoAction
    } = nextProps;

    // Set up key commands
    bindShortcut("shift+up", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "y", -10);
    });
    bindShortcut("shift+down", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "y", 10);
    });
    bindShortcut("shift+left", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "x", -10);
    });
    bindShortcut("shift+right", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "x", 10);
    });
    bindShortcut("up", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "y", -1);
    });
    bindShortcut("down", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "y", 1);
    });
    bindShortcut("left", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "x", -1);
    });
    bindShortcut("right", e => {
      e.preventDefault();
      bumpLayers(currentArtboardId, "x", 1);
    });
    bindShortcut("backspace", e => {
      deleteLayers(currentArtboardId);
    });
    bindShortcut(["command+c", "control+c"], () => {
      copyLayers(currentArtboardId);
    });
    bindShortcut(["command+v", "control+v"], () => {
      pasteLayers(currentArtboardId);
    });
    bindShortcut(["command+z", "control+z"], () => {
      undoAction(currentArtboardId);
    });
    bindShortcut(["command+e", "control+e"], () => {
      console.log(JSON.stringify(Artboards[currentArtboardId]));
    });
  }

  componentWillUnmount() {
    // Unbind shortcuts when unmounting
    this.props.unbindShortcut("shift+up");
    this.props.unbindShortcut("shift+down");
    this.props.unbindShortcut("shift+left");
    this.props.unbindShortcut("shift+right");
    this.props.unbindShortcut("up");
    this.props.unbindShortcut("down");
    this.props.unbindShortcut("left");
    this.props.unbindShortcut("right");
    this.props.unbindShortcut("backspace");
    this.props.unbindShortcut(["command+c", "command+c"]);
    this.props.unbindShortcut(["command+v", "command+v"]);
    this.props.unbindShortcut(["command+z", "command+z"]);
    this.props.unbindShortcut(["command+e", "command+e"]);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ArtboardShortcutsWrapper.propTypes = {
  bindShortcut: PropTypes.func.isRequired,
  bumpLayers: PropTypes.func.isRequired,
  copyLayers: PropTypes.func.isRequired,
  deleteLayers: PropTypes.func.isRequired,
  pasteLayers: PropTypes.func.isRequired,
  undoAction: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
    pasteLayers: artboardId => {
      dispatch(pasteLayers(artboardId));
    },
    undoAction: artboardId => {
      dispatch(undoAction(artboardId));
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  currentArtboardId: state.Content.currentArtboardId
});

const ArtboardShortcutsContainer = connect(mapStateToProps, mapDispatchToProps)(
  mouseTrap(ArtboardShortcutsWrapper)
);

export default ArtboardShortcutsContainer;
