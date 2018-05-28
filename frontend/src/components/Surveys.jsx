import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import MapButton from './MapButton';

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
    zIndex: "9999"
  },
  menu: {
    backgroundColor: "rgba(255,255,255,0.85)",
    width: "100%",
    height: "100%",
    padding: "45px 15px 15px 15px"
    // paddingTop: "30px"
  },
  collapseArrow: {
    float: "right"
  }
};



const { classes } = jss.createStyleSheet(styles).attach();
class Surveys extends Component {

  render() {
    let surveys = this.props.surveys;
    return (
      <div className="surveys col-12">
        <div className="row">
          <div className="col-12 col-lg-12">
            <MapButton text={"Surveys"}/>
            <div className={classes.menuContainer}>
              <div className={classes.menu}>
                {surveys.map((survey,index) => (
                  <div key={"survey-" + survey.id} className="survey-details">

                    <a data-toggle="collapse" href={"#collapseSurveyDetails"+survey.id}>
                      <strong>
                        {"Survey No: " + survey.survey_no}
                      </strong>
                      <span className={classes.collapseArrow}>^</span>
                    </a>
                    <div className="collapse" id={"collapseSurveyDetails"+survey.id}>
                      <div className="card card-body">
                        <p>{"Ship/Platform: " + survey.ship}</p>
                        <p>{"Total Samples Collected: " + survey.total_samples}</p> 
                        <a data-toggle="collapse" href={"#collapseSurveyCores"+survey.id}>
                          <strong>                            
                            {"Core Samples: " + survey.core_quant}
                          </strong>
                        </a>
                        <div className="collapse" id={"collapseSurveyCores"+survey.id}>
                          <div className="card card-body">                        
                            {survey.core_set.map((core,index) => (
                              <p key={core.id}>{core.sample_no}</p>
                            ))}    
                          </div>
                        </div>                                                       
                        <a data-toggle="collapse" href={"#collapseSurveyBagged"+survey.id}>
                          <strong>                            
                            {"Bagged Samples: " + survey.bag_quant}
                          </strong>
                        </a>
                        <div className="collapse" id={"collapseSurveyBagged"+survey.id}>
                          <div className="card card-body">                        
                            {survey.bag_set.map((bag,index) => (
                              <p key={bag.id}>{bag.sample_no}</p>
                            ))}    
                          </div>
                        </div>
                        {/*Point to url where map should show all samples
                        as markers @ surveys/survey.id*/}
                        <a href="#">See on map</a> 
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <GoogleMap/>      
          </div>
        </div>
      </div>
    );
  }
}

export default Surveys;
