import React from "react";

import ArtboardContainer from "../containers/ArtboardContainer";

class HomeView extends React.Component {
  render() {
    return (
      <div className={"home-view__wrapper"}>
        <div className="home-view__featured-case-study">
          <ArtboardContainer caseStudyId={"fake"} featured={true} />
        </div>
      </div>
    );
  }
}

export default HomeView;
