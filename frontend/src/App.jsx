import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';

import Home from './components/Home'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'

import SurveysContainer from './containers/SurveysContainer'
import SurveyContainer from './containers/SurveyContainer'
import CoresContainer from './containers/CoresContainer'
import ArcGis from './containers/ArcGis'

import {withRouter} from 'react-router';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <NavBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cores" component={CoresContainer} />
              <Route exact path="/surveys" component={SurveysContainer} />
              <Route exact path="/arcgis" component={ArcGis} />

              <Route exact path="/surveys/:id" component={SurveyContainer}/>
              <Route component={NotFound} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
