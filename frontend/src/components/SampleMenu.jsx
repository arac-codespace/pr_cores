import React, { Component } from 'react';

import Collapse from './Collapse';
import MenuContainer from './MenuContainer';
import SampleTable from './SampleTable';
import StratColumn from './StratColumn';
import SampleDescription from './SampleDescription';
import Header from './Header';


import CoreSection from './CoreSection';
import BaggedSection from './BaggedSection';



import { NavLink } from 'react-router-dom'

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  descriptionWrapper: {
    marginBottom: "1rem",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#ffffffb5", 
    border: "1px solid #cfcfcf",   
  },
  columnContainer: {
    extend: "descriptionWrapper",
    overflowX: 'auto',
  },
  section: {
    margin: "1rem 0px"
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
    "&:hover": {
      backgroundColor: "#4a6cc3",
      color: "white",
      textDecoration: "none"      
    }
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

class SampleMenu extends Component {

	render() {
		let survey = this.props.survey;
    let markerInfo = this.props.markerInfo;

    let handleBaggedSectionClick = this.props.handleBaggedSectionClick
    let handleCoreSectionClick = this.props.handleCoreSectionClick


		return (
      <MenuContainer id={"MenuContainer"}>
      	<Header text={"Survey Description"}/>
        <div className = "card card-body">   
          <SampleDescription label={"Survey No:"} info={survey.survey_no}/>         
          <SampleDescription label={"Ship/Platform:"} info={survey.ship}/>
          <SampleDescription label={"Total Samples Collected:"} info={survey.total_samples}/>    		
        </div>
        <CoreSection markerInfo={this.props.markerInfo} cores={survey.core_set} handleCoreSectionClick={handleCoreSectionClick}/>
        <BaggedSection markerInfo={this.props.markerInfo} bags={survey.bag_set} handleBaggedSectionClick={handleBaggedSectionClick}/>     
      </MenuContainer>	
		);
	}
}

export default SampleMenu;