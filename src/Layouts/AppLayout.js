import React from "react";
import { Route } from "react-router-dom";

import HomeContainer from "../Routes/CaseStudies/containers/HomeContainer";
import EditContainer from "../Routes/CaseStudies/containers/EditContainer";

// import '../App.css'

class AppLayout extends React.Component {
  render() {
    return (
      <div className="app-layout__container">
        <div className="app-layout__nav" />
        <div className="app-layout__body">
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/edit/:caseStudyId" component={EditContainer} />
        </div>
      </div>
    );
  }
}

export default AppLayout;
