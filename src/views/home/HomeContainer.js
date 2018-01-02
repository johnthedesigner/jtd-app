import { connect } from "react-redux";

import { deselectLayers } from "../../store/actions";
import HomeView from "./HomeView";

const mapDispatchToProps = dispatch => {
  return {
    deselectLayers: artboardId => {
      dispatch(deselectLayers(artboardId));
    }
  };
};

const mapStateToProps = state => {
  return {
    Artboards: state.Content.artboards
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default HomeContainer;
