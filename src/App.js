import React, { Component } from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import AppLayout from "./Layouts/AppLayout";

class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route path="/" component={AppLayout} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
