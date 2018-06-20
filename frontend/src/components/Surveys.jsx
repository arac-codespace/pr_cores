import React, { Component } from 'react';

import GoogleMap from './GoogleMap';
import { fitBounds } from 'google-map-react/utils';


import MapButton from './MapButton';
import SurveyMenu from './SurveyMenu';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  menuContainer: {
    width: "100%",
    padding: "10px 15px",
    // brings menu below button edge
    // paddingTop:"40px",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "9999",
    position: 'absolute',
    display: "none"
  },
  menuContainerActive: {
    extend: "menuContainer",
    display: "block",
  },
  colPadding: {
    padding: 0,
    overflow:"hidden"
  }
};

const bounds = {
  nw: {
    lat: 22,
    lng: -75
  },
  se: {
    lat: 13,
    lng: -60
  }
};


const size = {
  width: 1200, // Map width in pixels
  height: 800, // Map height in pixels
};

const {center, zoom} = fitBounds(bounds, size);


const { classes } = jss.createStyleSheet(styles).attach();
class Surveys extends Component {
  constructor() {
    super();
    this.state = {
      isSurveyMenuOpen: false,
      renderMarkers: true,
    };
    this.handleClickSurveys = this.handleClickSurveys.bind(this);
    // this.handleClickSurveysOutside = this.handleClickSurveysOutside.bind(this);

  };

  // https://larsgraubner.com/handle-outside-clicks-react/
  handleClickSurveys(target=null){
    // console.log("handleClickSurveys")
    // if (!this.state.isSurveyMenuOpen) {
    //   document.addEventListener('click', this.handleClickSurveysOutside, false);
    // } else {
    //   document.removeEventListener('click', this.handleClickSurveysOutside, false);      
    // }

    // if collapsed items are opened...
    let openElements = document.getElementsByClassName("collapse show")
    if (openElements.length > 0) {
      for(var i=0;i<openElements.length;i++){
          openElements[i].classList.remove('show');
      }      
    }

    // Target used when I want to show info after clicking marker/boundary...
    // target is survey id
    if (target) {
      let id = "SurveyDetails" + target;
      let surveyCollapse = document.getElementById(id);
      if (!surveyCollapse.classList.contains('show')) {
        surveyCollapse.classList.add('show');
      }
      // If user clicks survey boundary, menu will only
      // open and not toggle
      this.setState({
        isSurveyMenuOpen: true
      })
    } else {      
      // The fact that there's no target means that
      // user's not clicking a boundary.  So toggle
      // by clicking btn is enabled...
      this.setState(prevState => ({
        isSurveyMenuOpen: !prevState.isSurveyMenuOpen
      }));
    }

  }

  render() {

    let surveys = this.props.surveys;
    let isSurveyMenuOpen = this.state.isSurveyMenuOpen;
    let handleClickSurveys = this.handleClickSurveys;
    let renderMarkers = this.state.renderMarkers;

    // debugger; 
    let menuVisibility;
    if (isSurveyMenuOpen){
      menuVisibility = classes.menuContainerActive
    } else {
      menuVisibility = classes.menuContainer
    }
    return (
      <div className="surveys col-12">
        <div className="row">
          <div className={"col-12 col-lg-12 " + classes.colPadding}>
            <MapButton text={"Surveys"} handleClick={handleClickSurveys}/>
            <div className={"col-lg-4 " + menuVisibility}>
              <SurveyMenu surveys={surveys}/>
            </div>           
            <GoogleMap center={center} zoom={zoom} dataset = {surveys} renderMarkers={renderMarkers} handleClick={handleClickSurveys}>
            </GoogleMap>      
          </div>
        </div>
      </div>
    );
  }
}

export default Surveys;
