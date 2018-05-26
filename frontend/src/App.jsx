import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';

import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'

import SurveysContainer from './containers/SurveysContainer'
import CoresContainer from './containers/CoresContainer'

import {withRouter} from 'react-router';

class App extends Component {
  render() {
    return (
      <div>        
        <NavBar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cores" component={CoresContainer} />
            <Route exact path="/surveys" component={SurveysContainer} />
            <Route component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
