import React from "react";

import HomeBlock from "./HomeBlock";

class HomeView extends React.Component {
  render() {
    let { deselectLayers } = this.props;

    return (
      <div className={"home-view__wrapper"}>
        <div className="home-view__featured-case-study">
          <HomeBlock artboardId={"fake"} deselectLayers={deselectLayers}>
            <h3>Capitalize on low hanging fruit</h3>
            <p>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in
              real-time will have multiple touchpoints for offshoring.
            </p>
          </HomeBlock>
        </div>
      </div>
    );
  }
}

export default HomeView;
