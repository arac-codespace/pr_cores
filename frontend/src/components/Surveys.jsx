import React, { Component } from 'react';

import GoogleMap from './GoogleMap';
import { fitBounds } from 'google-map-react/utils';


import MapButton from './MapButton';
import Collapse from './Collapse';
import CorePin from './CorePin';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  menuContainer: {
    width: "100%",
    padding: "10px 29px",
    // brings menu below button edge
    // paddingTop:"40px",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "9999",
    display: "none"
  },
  menu: {
    backgroundColor: "rgba(255,255,255,0.85)",
    width: "100%",
    height: "100%",
    padding: "45px 15px 15px 15px",
    overflow: 'scroll',
    // paddingTop: "30px"
  },
  menuContainerActive: {
    extend: "menuContainer",
    display: "absolute",
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
  width: 640, // Map width in pixels
  height: 380, // Map height in pixels
};

const {center, zoom} = fitBounds(bounds, size);


const { classes } = jss.createStyleSheet(styles).attach();
class Surveys extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
      renderMarkers: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

  };
  // https://larsgraubner.com/handle-outside-clicks-react/


  handleClick(){
    if (!this.state.isMenuOpen) {
      document.addEventListener('click', this.handleClickOutside, false);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);      
    }

    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  }

  handleClickOutside(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();    
  }

  render() {

    let surveys = this.props.surveys;
    let isMenuOpen = this.state.isMenuOpen;
    let handleClick = this.handleClick;
    let renderMarkers = this.state.renderMarkers;

    // debugger;    

    let menuVisibility;
    if (isMenuOpen){
      menuVisibility = classes.menuContainerActive
    } else {
      menuVisibility = classes.menuContainer
    }
    return (
      <div className="surveys col-12">
        <div className="row">
          <div className="col-12 col-lg-12">
            <MapButton text={"Surveys"} handleClick={handleClick}/>
            <div className={menuVisibility}>
              <div className={classes.menu} ref={node=>{this.node=node;}}>
                {surveys.map((survey,index) => (
                  <div key={"survey-" + survey.id} className="survey-details">
                    <Collapse title={"Survey No: " + survey.survey_no} collapseId={"SurveyDetails"+survey.id}>
                      <p>{"Ship/Platform: " + survey.ship}</p>
                      <p>{"Total Samples Collected: " + survey.total_samples}</p>
                      {survey.total_samples >= 1 ? 
                        (
                          <div className="coreInfo">
                            <p>Survey Boundaries:</p> 
                            <ul>
                              <li>
                                {"[NW:" + survey.get_boundary.nw.lat + ", " + survey.get_boundary.nw.lng + "]"}
                              </li>
                              <li>
                                {"[SE: " + survey.get_boundary.se.lat + ", " + survey.get_boundary.se.lng + "]"}
                              </li>
                            </ul>
                            <Collapse title={"Core Samples: " + survey.core_quant} collapseId={"SurveyCores"+survey.id}>
                              <div>                          
                                {survey.core_set.map((core,index) => (
                                  <p key={core.id}>{core.sample_no}</p>
                                ))}                                 
                              </div>
                            </Collapse>                                                                                                   
                            <Collapse title={"Bagged Samples: " + survey.bag_quant} collapseId={"SurveyBagbed"+survey.id}>
                              <div>                          
                                {survey.bag_set.map((bag,index) => (
                                  <p key={bag.id}>{bag.sample_no}</p>
                                ))}                                 
                              </div>
                            </Collapse>
                          </div>
                        ):(<p>No Sample Info Available</p>)
                      } 
                      {/*Point to url where map should show all samples
                      as markers @ surveys/survey.id*/}
                      <a href="#">See on map</a> 
                    </Collapse>
                  </div>
                ))}
              </div>
            </div>
            <GoogleMap center={center} zoom={zoom} dataset = {surveys} renderMarkers={renderMarkers}>
            </GoogleMap>      
          </div>
        </div>
      </div>
    );
  }
}

export default Surveys;
