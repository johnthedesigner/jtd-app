import React from "react";

import ArtboardContainer from "../components/artboards/ArtboardContainer";
import { Title } from "../components/elements";

class Fake extends React.Component {
  render() {
    return (
      <div className="post-fake">
        <div className="post-header">
          <ArtboardContainer artboardId="fake" />
        </div>
        <div className="post-section">
          <Title className="fake__title">Lorem ipsum dolor sit amet.</Title>
        </div>
      </div>
    );
  }
}

export default Fake;
