import { connect } from "react-redux";

import EditView from "../components/EditView";

const mapStateToProps = (state, ownProps) => {
  return {
    caseStudyId: ownProps.match.params.caseStudyId
  };
};

const EditContainer = connect(mapStateToProps)(EditView);

export default EditContainer;
