import { connect } from "react-redux";

import { deselectLayers } from "../actions";
import HomeView from "../components/HomeView";

const mapDispatchToProps = dispatch => {
  return {
    deselectLayers: artboardId => {
      dispatch(deselectLayers(artboardId));
    }
  };
};

const mapStateToProps = state => {
  return {
    Artboards: state.Artboards.artboards
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomeContainer;
