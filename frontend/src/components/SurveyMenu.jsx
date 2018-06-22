import React, { Component } from 'react';

import Collapse from './Collapse';
import MenuContainer from './MenuContainer';
import SampleTable from './SampleTable';

import { NavLink } from 'react-router-dom'

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  menu: {
    backgroundColor: "rgba(255,255,255,0.85)",
    width: "100%",
    height: "100%",
    padding: "15px 15px 15px 15px",
    overflow: 'auto',
    // marginTop:"32px",
    // paddingTop: "30px"
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

class SurveyMenu extends Component {
	render() {
		let surveys = this.props.surveys;    

		return (
      <MenuContainer>
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
                      <SampleTable samples={survey.core_set}/>
                    </Collapse>                                                                                                   
                    <Collapse title={"Bagged Samples: " + survey.bag_quant} collapseId={"SurveyBagbed"+survey.id}>
                      <SampleTable samples={survey.bag_set}/>
                    </Collapse>
                  </div>
                ):(<p>No Sample Info Available</p>)
              } 
              {/*Point to url where map should show all samples
              as markers @ surveys/survey.id*/}
              <NavLink exact to={"surveys/" + survey.id}>
                <span> See on map </span>
              </NavLink> 
            </Collapse>
          </div>
        ))}
      </MenuContainer>				
		);
	}
}

export default SurveyMenu;