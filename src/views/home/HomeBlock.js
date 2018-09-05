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
        <div className="home-block__artboard-section">
          {(() => {
            if (true) {
              return <ArtboardContainer artboardId={artboardId} featured={true} />
            } else {
              return <i>artboard</i>
            }
          })()}
        </div>
        <div className="home-block__caption-section">
          <p>
            <span className="home-block__caption-text">The quick brown fox jumped over the lazy dog</span>
            <span className="home-block__caption-date">– Sep. 3, 2018</span>
          </p>
        </div>
      </div>
    );
  }
}

export default HomeBlock;
