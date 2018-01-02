import React from "react";

import ArtboardContainer from "../containers/ArtboardContainer";

class EditView extends React.Component {
  render() {
    return (
      <div className={"edit-view__wrapper"}>
        <div className="edit-view__featured-case-study">
          <ArtboardContainer
            caseStudyId={this.props.caseStudyId}
            featured={true}
          />
        </div>
      </div>
    );
  }
}

export default EditView;
