import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import HomeBlock from "./HomeBlock";
import ArtboardShortcutsContainer from "../../components/artboards/ArtboardShortcutsContainer";

class HomeView extends React.Component {
  render() {
    let { deselectLayers } = this.props;

    return (
      <ArtboardShortcutsContainer>
        <div className={"home-view__wrapper"}>
          <div className="home-view__featured-case-study">
            <HomeBlock artboardId={"fake"} deselectLayers={deselectLayers}>
              <div className="home-item">
                <h4 className="home-item__category">Prototype</h4>
                <h3 className="home-item__title">
                  Capitalize on low hanging fruit
                </h3>
                <p className="home-item__blurb">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation X is on the runway
                  heading towards a streamlined cloud solution. User generated
                  content in real-time will have multiple touchpoints for
                  offshoring.
                </p>
                <Link to="/posts/fake">
                  <button className="home-item__cta">
                    {"But wait... There's more!"}
                  </button>
                </Link>
              </div>
            </HomeBlock>

            <HomeBlock artboardId={"fake2"} deselectLayers={deselectLayers}>
              <div className="home-item">
                <h4 className="home-item__category">Prototype</h4>
                <h3 className="home-item__title">
                  Capitalize on low hanging fruit
                </h3>
                <p className="home-item__blurb">
                  Bring to the table win-win survival strategies to ensure
                  proactive domination. At the end of the day, going forward, a
                  new normal that has evolved from generation X is on the runway
                  heading towards a streamlined cloud solution. User generated
                  content in real-time will have multiple touchpoints for
                  offshoring.
                </p>
                <Link to="/posts/fake2">
                  <button className="home-item__cta">
                    {"But wait... There's more!"}
                  </button>
                </Link>
              </div>
            </HomeBlock>
          </div>
        </div>
      </ArtboardShortcutsContainer>
    );
  }
}

HomeView.propTypes = {
  deselectLayers: PropTypes.func.isRequired
};

export default HomeView;
