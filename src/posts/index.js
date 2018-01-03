import React from "react";
import { Route } from "react-router-dom";

import ArtboardShortcutsContainer from "../components/artboards/ArtboardShortcutsContainer";

import Fake from "./Fake";
import Fake2 from "./Fake2";

class Posts extends React.Component {
  render() {
    return (
      <ArtboardShortcutsContainer>
        <Route exact path="/posts/fake" component={Fake} />
        <Route exact path="/posts/fake2" component={Fake2} />
      </ArtboardShortcutsContainer>
    );
  }
}

export default Posts;
