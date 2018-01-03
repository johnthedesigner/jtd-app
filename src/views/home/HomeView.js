import React from "react";
import PropTypes from "prop-types";
import { mouseTrap } from "react-mousetrap";
import { Link } from "react-router-dom";

import HomeBlock from "./HomeBlock";

class HomeView extends React.Component {
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
    let { deselectLayers } = this.props;

    return (
      <div className={"home-view__wrapper"}>
        <div className="home-view__featured-case-study">
          <HomeBlock artboardId={"fake"} deselectLayers={deselectLayers}>
            <div className="home-item">
              <h4 className="home-item__category">Prototype</h4>
              <h3 className="home-item__title">
                Capitalize on low hanging fruit
              </h3>
              <p className="home-item__blurb">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring.
              </p>
              <Link to="/posts/fake">
                <button className="home-item__cta">
                  {"But wait... There's more!"}
                </button>
              </Link>
            </div>
          </HomeBlock>

          <HomeBlock artboardId={"fake2"} deselectLayers={deselectLayers}>
            <div className="home-item">
              <h4 className="home-item__category">Prototype</h4>
              <h3 className="home-item__title">
                Capitalize on low hanging fruit
              </h3>
              <p className="home-item__blurb">
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring.
              </p>
              <Link to="/posts/fake2">
                <button className="home-item__cta">
                  {"But wait... There's more!"}
                </button>
              </Link>
            </div>
          </HomeBlock>
        </div>
      </div>
    );
  }
}

HomeView.propTypes = {
  bindShortcut: PropTypes.func.isRequired,
  bumpLayers: PropTypes.func.isRequired,
  copyLayers: PropTypes.func.isRequired,
  deleteLayers: PropTypes.func.isRequired,
  pasteLayers: PropTypes.func.isRequired,
  undoAction: PropTypes.func.isRequired
};

export default mouseTrap(HomeView);
