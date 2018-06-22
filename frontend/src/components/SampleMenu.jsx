import React, { Component } from 'react';

import Collapse from './Collapse';
import MenuContainer from './MenuContainer';
import SampleTable from './SampleTable';
import StratColumn from './StratColumn';
import SampleDescription from './SampleDescription';
import Header from './Header';

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
    let visibility = this.props.visibility;
		return (
      <MenuContainer id={"MenuContainer"}>
      	<Header text={"Survey Description"}/>
        <div className = "card card-body">   
          <SampleDescription label={"Survey No:"} info={survey.survey_no}/>         
          <SampleDescription label={"Ship/Platform:"} info={survey.ship}/>
          <SampleDescription label={"Total Samples Collected:"} info={survey.total_samples}/>    		
        </div>
        <Collapse 
          title={"Core Samples"} 
          collapseId={"CoreSamples"}
          titleStyle={classes.collapseHeader}
          >          
          {survey.core_set.map((core,index) => (
            <div key={"core-" + core.id} className="core-details">
              <Collapse title={core.sample_no} collapseId={core.sample_no+core.id}>
                <div className={classes.descriptionWrapper}>
                  <SampleDescription label={"Sample No:"} info={core.sample_no}/>
                  <SampleDescription label={"Latitude:"} info={core.lat}/>
                  <SampleDescription label={"Longitude:"} info={core.lng}/>
                  <SampleDescription label={"Date Collected:"} info={core.date_coll}/>
                  <SampleDescription label={"Collected By:"} info={core.collected_by}/>
                  <SampleDescription label={"Core Type:"} info={core.core_type}/>
                  <SampleDescription label={"Length:"} info={core.total_length}/>
                  <SampleDescription label={"Depth:"} info={core.depth}/>
                  <SampleDescription label={"Core Condition:"} info={core.core_condition}/>
                  <SampleDescription label={"Described By:"} info={core.described_by}/>
                  <SampleDescription label={"Location:"} info={core.physiographic_location}/>
                  <SampleDescription label={"Date Described:"} info={core.date_described}/>
                  <div className={classes.section}>
                    <Collapse title={"Visualization"} collapseId={"ColumnCollapse"+core.id} getWidth={this.getWidth} awaitWidth={true}>  
                      <div className = {classes.columnContainer}>
                        <StratColumn core={core}/>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </Collapse>
            </div>
          ))}
        </Collapse>
        <Collapse 
          title={"Bagged Samples"} 
          collapseId={"BaggedSamples"}
          titleStyle={classes.collapseHeader}
        >            
          {survey.bag_set.map((bag,index) => (
            <div key={"bag-" + bag.id} className="bag-details">
              <Collapse title={bag.sample_no} collapseId={bag.sample_no+bag.id}>
                <div className={classes.descriptionWrapper}>
                  <SampleDescription label={"Sample No:"} info={bag.sample_no}/>
                  <SampleDescription label={"Latitude:"} info={bag.lat}/>
                  <SampleDescription label={"Longitude:"} info={bag.lng}/>
                  <SampleDescription label={"Date Collected:"} info={bag.date_coll}/>
                  <SampleDescription label={"Collected By:"} info={bag.collected_by}/>
                  <SampleDescription label={"Description:"} info={bag.description}/>    
                </div>                                                             
              </Collapse>
            </div>
          ))}
        </Collapse>        
      </MenuContainer>	
		);
	}
}

export default SampleMenu;