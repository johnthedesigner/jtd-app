import React from "react";

import ArtboardContainer from "../../components/artboards/ArtboardContainer";

class HomeBlock extends React.Component {
  render() {
    let { artboardId, deselectLayers } = this.props;

    return (
      <div
        className={"home-block"}
        id={`home-block-${artboardId}`}
        onClick={() => deselectLayers(artboardId)}
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
