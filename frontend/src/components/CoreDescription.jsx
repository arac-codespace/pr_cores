import React, { Component } from 'react';
import Collapse from './Collapse'
import StratColumn from './StratColumn';
import SampleDescription from './SampleDescription';
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
};

const { classes } = jss.createStyleSheet(styles).attach();

class CoreDescription extends Component {

	render() {

		let sample = this.props.sample;

		return (
      <div className={classes.descriptionWrapper}>
        <SampleDescription label={"Sample No:"} info={sample.sample_no}/>
        <SampleDescription label={"Latitude:"} info={sample.lat}/>
        <SampleDescription label={"Longitude:"} info={sample.lng}/>
        <SampleDescription label={"Date Collected:"} info={sample.date_coll}/>
        <SampleDescription label={"Collected By:"} info={sample.collected_by}/>
        <SampleDescription label={"Core Type:"} info={sample.core_type ? sample.core_type : "Undefined"}/>
        <SampleDescription label={"Length (cm):"} info={sample.total_length}/>
        <SampleDescription label={"Depth (cm):"} info={sample.depth}/>
        <SampleDescription label={"Core Condition:"} info={sample.core_condition ? sample.core_condition : "Undefined"}/>
        <SampleDescription label={"Described By:"} info={sample.described_by}/>
        <SampleDescription label={"Location:"} info={sample.physiographic_location}/>
        <SampleDescription label={"Date Described:"} info={sample.date_described}/>
        <div className={classes.section}>
          <Collapse title={"Visualization"} collapseId={"ColumnCollapse"+sample.id}>  
            <div className = {classes.columnContainer}>
              <StratColumn core={sample}/>
            </div>
          </Collapse>
        </div>
      </div>	

		);
	}
}

export default CoreDescription;