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
    padding: "44px 10px 16px 14px",
    // brings menu below button edge
    // paddingTop:"40px",
    height: "100%",
    top: "0",
    left: "0",
    zIndex: "9999",
    position: "absolute",
    visibility: "hidden",
  },
  menuContainerActive: {
    extend: "menuContainer",
    visibility: "visible",
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

const markerInfo = {
  openCores: false,
  openBagged: false,
  sampleNo: false
}
class SurveyDetails extends Component {

  constructor() {
    super();
    this.state = {
      isInfoOpen: false,
      renderMarkers: true,
      markerInfo: markerInfo,
    };
    this.toggleOpenMenu = this.toggleOpenMenu.bind(this);
    this.handleMarkerInfo = this.handleMarkerInfo.bind(this);
    this.handleBaggedSectionClick = this.handleBaggedSectionClick.bind(this);
    this.handleCoreSectionClick = this.handleCoreSectionClick.bind(this);
  };	

  // https://larsgraubner.com/handle-outside-clicks-react/
  toggleOpenMenu(){
    // I don't want component to keep state of markerInfo
    // when closing the menu by clicking the btn, so...
    this.setState((prevState) => ({
      isInfoOpen: !prevState.isInfoOpen,
      markerInfo: markerInfo
    }))
  }

  handleMarkerInfo(markerInfo=null){
    if (markerInfo !== null){      
      let openCores = markerInfo.isCore;
      let openBagged = !markerInfo.isCore;
      let sampleNo = markerInfo.name;

      this.setState({
        isInfoOpen: true,
        markerInfo: {
          openCores: openCores,
          openBagged: openBagged,
          sampleNo: sampleNo,
        }
      })
    }
  }

  handleBaggedSectionClick(){
    // Basically, using this click will erase the marker sample_no record
    console.log("baggedsectionclick")
    this.setState(prevState => ({
      markerInfo: {
        openBagged: !prevState.markerInfo.openBagged,
        sampleNo: null,
      }
    }))
  }

  handleCoreSectionClick(){
    console.log("coresectionclick")    
    this.setState(prevState => ({
      markerInfo: {
        openCores: !prevState.markerInfo.openCores,
        sampleNo: null,
      }
    }))
  }

	render() {
    // functions
    console.log("huh")
    let handleMarkerInfo = this.handleMarkerInfo;
    let toggleOpenMenu = this.toggleOpenMenu;

    let survey = this.props.survey;
    let isInfoOpen = this.state.isInfoOpen;
    let renderMarkers = this.state.renderMarkers;

    let content;
    if (isInfoOpen){
      content = 
      <SampleMenu 
        survey={survey} 
        visibility={isInfoOpen} 
        markerInfo={this.state.markerInfo} 
        handleCoreSectionClick={this.handleCoreSectionClick} 
        handleBaggedSectionClick={this.handleBaggedSectionClick}
      />
    }

    return (
      <div className="survey col-12">
        <div className="row">
          <div className={"col-12 col-lg-12"}>
            <div className="row">
              <MapButton text={"Info"} handleClick={toggleOpenMenu}/>
              {content}                                                
              <GoogleMap center={center} zoom={zoom} dataset = {survey} renderMarkers={renderMarkers} handleClick={handleMarkerInfo}>
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    );
	}
}

export default SurveyDetails;