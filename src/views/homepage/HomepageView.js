import React from "react";
import PropTypes from "prop-types";

import ArtboardShortcutsContainer from "../../components/artboards/ArtboardShortcutsContainer";
import ArtboardContainer from "../../components/artboards/ArtboardContainer";

class HomepageView extends React.Component {
  render() {
    let { deselectLayers } = this.props;

    return (
      <ArtboardShortcutsContainer>
        <div className={"home-view__wrapper"}>
          <div className="home-view__artboard-wrapper" onClick={deselectLayers}>
            <ArtboardContainer artboardId={"fake2"} featured={true} />
          </div>
        </div>
      </ArtboardShortcutsContainer>
    );
  }
}

HomepageView.propTypes = {
  deselectLayers: PropTypes.func.isRequired
};

export default HomepageView;
