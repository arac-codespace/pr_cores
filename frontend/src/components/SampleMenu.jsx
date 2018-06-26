import React, { Component } from 'react';

import MenuContainer from './MenuContainer';
import SampleDescription from './SampleDescription';
import Header from './Header';


import MenuSection from './MenuSection';
import SurveyDescription from './SurveyDescription';
import BaggedDescription from './BaggedDescription';
import CoreDescription from './CoreDescription';
import CollapseDescriptionWrapper from './CollapseDescriptionWrapper';


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



    let coreDescriptions; 
    if (survey.core_set.length > 0){      
      let CoresWithCollapse = CollapseDescriptionWrapper(CoreDescription);
      coreDescriptions = survey.core_set.map((item,index) => (
        <CoresWithCollapse key={item.sample_no + item.id} sample={item} markerInfo={markerInfo}/>
      ))    
    }
    

    
    let baggedDescriptions;
    if (survey.bag_set.length > 0){      
      let BaggedWithCollapse = CollapseDescriptionWrapper(BaggedDescription);
      baggedDescriptions = survey.bag_set.map((item,index) => (
        <BaggedWithCollapse key={item.sample_no + item.id} sample={item} markerInfo={markerInfo}/>
      ))    
    }
     

		return (
      <MenuContainer id={"MenuContainer"}>
      	<Header text={"Survey Description"}/>
        <div className = "card card-body">   
          <SurveyDescription survey={survey}/>    		
        </div>
        <MenuSection title={"Core Samples"} id={"coreSamples"} showInfo={markerInfo.openCores} handleClick={handleCoreSectionClick}>          
          {coreDescriptions}
        </MenuSection>

        <MenuSection title={"Bagged Samples"} id={"baggedSamples"} showInfo={markerInfo.openBagged} handleClick={handleBaggedSectionClick}>          
          {baggedDescriptions}
        </MenuSection>        
      </MenuContainer>	
		);
	}
}

export default SampleMenu;