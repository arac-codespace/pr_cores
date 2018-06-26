import React, { Component } from 'react';
import SampleDescription from './SampleDescription';

class SurveyDescription extends Component {
	render() {
    let survey = this.props.survey
		return (
			<div className="SurveyDescription">
        <SampleDescription label={"Survey No:"} info={survey.survey_no}/>         
        <SampleDescription label={"Ship/Platform:"} info={survey.ship}/>
        <SampleDescription label={"Northwest Boundary:"} info={survey.get_boundary.nw.lat + ", " + survey.get_boundary.nw.lng}/>
        <SampleDescription label={"Southeast Boundary:"} info={survey.get_boundary.se.lat + ", " + survey.get_boundary.se.lng}/>
        {survey.total_samples >= 1 ? 
          (
            <div className="sampleInfo">
              <SampleDescription label={"Core Samples Collected:"} info={survey.core_quant}/>  
              <SampleDescription label={"Bagged Samples Collected:"} info={survey.bag_quant}/>  
            </div>
          ):(<p>No Sample Info Available</p>)
        }                  
      </div>
		);
	}
}

export default SurveyDescription;