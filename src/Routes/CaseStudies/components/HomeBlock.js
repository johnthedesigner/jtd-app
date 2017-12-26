import React from "react";

import ArtboardContainer from "../containers/ArtboardContainer";

class HomeBlock extends React.Component {
  render() {
    let { artboardId, deselectLayersArtboard } = this.props;

    return (
      <div
        className={"home-block"}
        onClick={() => deselectLayersArtboard(artboardId)}
      >
        <div className="home-block__text-section">
          <div className="home-block__text-container">
            {this.props.children}
          </div>
        </div>
        <div className="home-block__artboard-section">
          <ArtboardContainer artboardId={artboardId} featured={true} />
        </div>
      </div>
    );
  }
}

export default HomeBlock;
