import React from "react";
import { Route } from "react-router-dom";

import Logo from "./components/Logo";
import NavMenu from "./components/NavMenu";
import HomeContainer from "./views/home/HomeContainer";
import HomepageContainer from "./views/homepage/HomepageContainer";
import EditContainer from "./views/edit/EditContainer";
import PostsRoutes from "./posts/";

// import '../App.css'

class AppLayout extends React.Component {
  render() {
    return (
      <div className="app-layout__container">
        <div className="app-layout__nav">
          <Logo />
          <NavMenu />
        </div>
        <div className="app-layout__body">
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/home" component={HomepageContainer} />
          <Route exact path="/edit/:caseStudyId" component={EditContainer} />
          <Route path="/posts" component={PostsRoutes} />
        </div>
      </div>
    );
  }
}

export default AppLayout;
