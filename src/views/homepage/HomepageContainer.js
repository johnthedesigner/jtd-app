import { connect } from "react-redux";

import { deselectLayers } from "../../store/actions";
import HomepageView from "./HomepageView";

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

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(
  HomepageView
);

export default HomepageContainer;
