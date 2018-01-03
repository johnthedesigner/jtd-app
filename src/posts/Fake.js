import React from "react";

import ArtboardContainer from "../components/artboards/ArtboardContainer";

class Fake extends React.Component {
  render() {
    return (
      <div className="post-fake">
        <div className="post-header">
          <ArtboardContainer artboardId="fake" />
        </div>
      </div>
    );
  }
}

export default Fake;
