import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './components/Header'
import HomeView from './Routes/Home/components/HomeView'
import './App.css'

class App extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render() {
    const { routes, store } = this.props
    console.log(routes)
    const RouteWithSubRoutes = (route) => (
      <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes}/>
      )}/>
    )

    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <div>
              <Header/>
              <Route exact path='/' component={HomeView}/>
              {routes.childRoutes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
              ))}
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
