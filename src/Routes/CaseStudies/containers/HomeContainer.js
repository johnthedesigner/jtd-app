import { connect } from "react-redux";

import { deselectLayersArtboard } from "../actions";
import HomeView from "../components/HomeView";

const mapDispatchToProps = dispatch => {
  return {
    deselectLayersArtboard: artboardId => {
      dispatch(deselectLayersArtboard(artboardId));
    }
  };
};

const mapStateToProps = state => {
  return {
    Artboards: state.CaseStudies.caseStudies
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomeContainer;
