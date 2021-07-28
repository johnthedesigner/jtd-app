import React from "react";
import PropTypes from "prop-types";

import HomeBlock from "./HomeBlock";
import ArtboardShortcutsContainer from "../../components/artboards/ArtboardShortcutsContainer";

class HomeView extends React.Component {
  render() {
    let { deselectLayers } = this.props;

    return (
      <ArtboardShortcutsContainer>
        <div className={"home-view__wrapper"}>
          <div className="home-view__featured-case-study">
            <HomeBlock artboardId={"fake2"} deselectLayers={deselectLayers} />
          </div>
        </div>
      </ArtboardShortcutsContainer>
    );
  }
}

HomeView.propTypes = {
  deselectLayers: PropTypes.func.isRequired,
};

export default HomeView;
