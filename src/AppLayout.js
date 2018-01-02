import React from "react";
import { Route } from "react-router-dom";

import Logo from "./components/Logo";
import HomeContainer from "./views/home/HomeContainer";
import EditContainer from "./views/edit/EditContainer";

// import '../App.css'

class AppLayout extends React.Component {
  render() {
    return (
      <div className="app-layout__container">
        <div className="app-layout__nav">
          <Logo />
        </div>
        <div className="app-layout__body">
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/edit/:caseStudyId" component={EditContainer} />
        </div>
      </div>
    );
  }
}

export default AppLayout;
