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

    // NOTE: From prior experience, avoid removing class names directly
    // if the class is tied to behaviour.  Here I use click to close
    // collapsable elements so the 'onClick' behaviour of the collapse
    // components triggers.  Removing the 'show' class directly will
    // fuck everything up becase the components will not keep track
    // of the state properly...

    // Target used when I want to show info after clicking marker/boundary...
    // target is object with id, name, isSurvey
    if (target && !target.isSurvey) {      
      // make menu visible
      // debugger;
      this.setState({
        isSampleMenuOpen: true
      })
      

      let id = target.name + target.id;
      let anchorID = "collapse"+id;
      let coreID = "CoreSamples";
      let baggedID = "BaggedSamples"
  
      console.log(target)

      let sectionToCollapse;
      if (target.isCore){
        sectionToCollapse = {
          anchor: document.getElementById("collapse" + coreID),
          collapse: document.getElementById(coreID)
        };
      } else {
        sectionToCollapse = {
          anchor: document.getElementById("collapse" + baggedID),
          collapse: document.getElementById(baggedID)
        };        
      }

      console.log(sectionToCollapse);

      // If the stuff is already open, don't close the stuff...
      // if (document.getElementById(anchorID).classList.contains('collapsed') && sectionToCollapse.classList.contains('collapsed')){          
      //   let collapseAnchors = document.getElementsByClassName("collapseHeader");
      //   if (collapseAnchors.length > 0) {
      //     for(var i=0;i<collapseAnchors.length;i++){
      //       // If the anchor is NOT collapsed
      //       if (!collapseAnchors[i].classList.contains("collapsed")) {
      //         collapseAnchors[i].click();
      //       }
      //     }      
      //   }
      // }

      if (document.getElementById(anchorID).classList.contains('collapsed')) {
        if (sectionToCollapse.anchor.classList.contains('collapsed')){
          sectionToCollapse.anchor.click();
        };
        // console.log(document.getElementById(anchorID));

        // document.getElementById(anchorID).addEventListener("focus", function(){
        //   console.log("Hey! I focused and should scroll...")
        // })

        document.getElementById(anchorID).click();
        // document.getElementById(anchorID).scrollIntoView()
      }

    } else {      
      // Target is null...

      // The fact that there's no target means that
      // user's not clicking a boundary.  So toggle
      // by clicking btn is enabled...

      let collapseAnchors = document.getElementsByClassName("collapseHeader");
      if (collapseAnchors.length > 0) {
        for(var i=0;i<collapseAnchors.length;i++){
          // If the anchor is NOT collapsed
          if (!collapseAnchors[i].classList.contains("collapsed")) {
            collapseAnchors[i].click();
          }
        }      
      }      
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
          <div className={"col-12 col-lg-12"}>
            <div className="row">
              <MapButton text={"Info"} handleClick={handleClickSamples}/>
              <div className={"col-lg-6 col-12 " + menuVisibility}>
                <SampleMenu survey={survey} visibility={isSampleMenuOpen}/>
              </div>           
              <GoogleMap center={center} zoom={zoom} dataset = {survey} renderMarkers={renderMarkers} handleClick={handleClickSamples}>
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    );
	}
}

export default SurveyDetails;