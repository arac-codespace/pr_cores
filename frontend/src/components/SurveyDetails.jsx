import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import { fitBounds } from 'google-map-react/utils';


import MapButton from './MapButton';
import SampleMenu from './SampleMenu';

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
    position: "absolute",
    visibility: "hidden",
  },
  menuContainerActive: {
    extend: "menuContainer",
    visibility: "visible",
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

class SurveyDetails extends Component {

  constructor() {
    super();
    this.state = {
      isSampleMenuOpen: false,
      renderMarkers: true,
    };
    this.handleClickSamples = this.handleClickSamples.bind(this);
  };	

  // https://larsgraubner.com/handle-outside-clicks-react/
  handleClickSamples(target=null){

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
        isSampleMenuOpen: true
      })
    } else {      
      // The fact that there's no target means that
      // user's not clicking a boundary.  So toggle
      // by clicking btn is enabled...
      this.setState(prevState => ({
        isSampleMenuOpen: !prevState.isSampleMenuOpen
      }));
    }
  }  


	render() {
    let survey = this.props.survey;
    let isSampleMenuOpen = this.state.isSampleMenuOpen;
    let handleClickSamples = this.handleClickSamples;
    let renderMarkers = this.state.renderMarkers;

    // debugger; 
    let menuVisibility;
    if (isSampleMenuOpen){
      menuVisibility = classes.menuContainerActive
    } else {
      menuVisibility = classes.menuContainer
    }
    return (
      <div className="survey col-12">
        <div className="row">
          <div className={"col-12 col-lg-12 " + classes.colPadding}>
            <MapButton text={"Info"} handleClick={handleClickSamples}/>
            <div className={"col-12 " + menuVisibility}>
              <SampleMenu survey={survey} visibility={isSampleMenuOpen}/>
            </div>           
            <GoogleMap center={center} zoom={zoom} dataset = {survey} renderMarkers={renderMarkers} handleClick={handleClickSamples}>
            </GoogleMap>      
          </div>
        </div>
      </div>
    );
	}
}

export default SurveyDetails;