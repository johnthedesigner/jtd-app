import React from "react";
import PropTypes from "prop-types";

import HomeBlock from "./HomeBlock";
import ArtboardShortcutsContainer from "../../components/artboards/ArtboardShortcutsContainer";

class HomeView extends React.Component {
  render() {
    let { deselectLayers } = this.props;

    return (
      <ArtboardShortcutsContainer>
        <div className={"home-view__wrapper"}>
          <div className="home-view__featured-case-study">
            <HomeBlock artboardId={"fake2"} deselectLayers={deselectLayers}>
              <div className="home-item">
                <h3 className="home-item__title">John the designer</h3>
                <p className="home-item__blurb">
                  Hey, my name is John Livornese and I’m the head of product
                  design at{" "}
                  <a href="http://luminoso.com" target="_blank">
                    Luminoso{" "}
                  </a>
                  in Cambridge, Massachusetts.
                </p>
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
