import React, { Component } from 'react';

import Collapse from './Collapse';
import MenuContainer from './MenuContainer';
import SampleTable from './SampleTable';

import SurveyDescription from './SurveyDescription';
import MenuSection from './MenuSection';
import CollapseDescriptionWrapper from './CollapseDescriptionWrapper';

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
  },
  collapseHeader: {
    backgroundColor: "#2e374e",
    fontSize: "1rem",
    display: "block",
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",    
    margin: "0.2rem 0rem 0rem 0px",
    cursor: "pointer",    
    "&:hover": {
      backgroundColor: "#4a6cc3",
      color: "white",
      textDecoration: "none"      
    }
  },
  anchor: {
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: 'bold',    
  } 
};

const { classes } = jss.createStyleSheet(styles).attach();

class SurveysMenu extends Component {

	render() {
		let surveys = this.props.surveys;    
    let markerInfo = this.props.markerInfo;


    let surveyDescription; 
    let SurveyWithCollapse = CollapseDescriptionWrapper(SurveyDescription);
    surveyDescription = surveys.map((survey,index) => (
      <div key={"survey-" + survey.id} className="survey-details">
        <SurveyWithCollapse 
          key={survey.survey_no + survey.id} 
          survey={survey} 
          markerInfo={markerInfo} 
          isSurvey={true} 
          style={classes.collapseHeader}
        >
          <NavLink exact to={"surveys/" + survey.id}>
            <span className={classes.anchor}> See on map </span>
          </NavLink> 
        </SurveyWithCollapse>
      </div>
    ))    
    
        
    return (
      <MenuContainer>
        {surveyDescription}
      </MenuContainer>				
		);
	}
}

export default SurveysMenu;