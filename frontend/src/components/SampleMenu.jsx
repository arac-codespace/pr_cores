import React, { Component } from 'react';

import Collapse from './Collapse';
import MenuContainer from './MenuContainer';
import SampleTable from './SampleTable';
import StratColumn from './StratColumn';

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
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginTop:"32px",
    // paddingTop: "30px"
  },
  columnContainer: {
    overflowX: 'auto',
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

class SampleMenu extends Component {

	render() {
		let survey = this.props.survey;
    let visibility = this.props.visibility;
		return (
      <MenuContainer>
      	<h4>{"Survey No: " + survey.survey_no}</h4>
        <p>{"Ship/Platform: " + survey.ship}</p>
        <p>{"Total Samples Collected: " + survey.total_samples}</p>      		
      	<h5>{"Core Samples"}</h5>
        {survey.core_set.map((core,index) => (

          <div key={"core-" + core.id} className="core-details">
            <Collapse title={"Sample No: " + core.sample_no} collapseId={core.sample_no+core.id}>
              <p>{"Latitude: " + core.lat}</p>
              <p>{"Longitude: " + core.lng}</p>
              <p>{"Date Collected: " + core.date_coll}</p>
              <p>{"Collected By: " + core.collected_by}</p>
              <p>{"Core Type: " + core.core_type}</p>
              <p>{"Total Length: " + core.total_length}</p> 
              <p>{"Depth: " + core.depth}</p> 
              <p>{"Core Condition: " + core.core_condition}</p>
              <p>{"Described By: " + core.described_by}</p>
              <p>{"Location: " + core.physiographic_location}</p>
              <p>{"Date Described: " + core.date_described}</p>  
              <Collapse title={"Visualization"} collapseId={"ColumnCollapse"+core.id} getWidth={this.getWidth}>  
                <div className = {classes.columnContainer}>
                  <StratColumn core={core}/>
                </div>
              </Collapse>
            </Collapse>
          </div>
        ))}
      	<h5>{"Bagged Samples"}</h5>
        {survey.bag_set.map((bag,index) => (

          <div key={"bag-" + bag.id} className="bag-details">
            <Collapse title={"Sample No: " + bag.sample_no} collapseId={bag.sample_no+bag.id}>
              <p>{"Latitude: " + bag.lat}</p>
              <p>{"Longitude: " + bag.lng}</p>
              <p>{"Date Collected: " + bag.date_coll}</p>
              <p>{"Collected By: " + bag.collected_by}</p>
              <p>{"Description: " + bag.description}</p>
            </Collapse>
          </div>
        ))}        
      </MenuContainer>	
		);
	}
}

export default SampleMenu;