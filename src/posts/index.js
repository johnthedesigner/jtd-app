import React from "react";
import { Route } from "react-router-dom";

import Fake from "./Fake";
import Fake2 from "./Fake2";

class Posts extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/posts/fake" component={Fake} />
        <Route exact path="/posts/fake2" component={Fake2} />
      </div>
    );
  }
}

export default Posts;
