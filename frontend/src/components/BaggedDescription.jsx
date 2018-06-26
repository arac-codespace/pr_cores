import React, { Component } from 'react';
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
};

const { classes } = jss.createStyleSheet(styles).attach();
class BaggedDescription extends Component {

	render() {
    let sample = this.props.sample;

		return (
      <div className={classes.descriptionWrapper}>
        <SampleDescription label={"Sample No:"} info={sample.sample_no}/>
        <SampleDescription label={"Latitude:"} info={sample.lat}/>
        <SampleDescription label={"Longitude:"} info={sample.lng}/>
        <SampleDescription label={"Date Collected:"} info={sample.date_coll}/>
        <SampleDescription label={"Collected By:"} info={sample.collected_by}/>
        <SampleDescription label={"Description:"} info={sample.description}/>    
      </div>	
		);
	}
}

export default BaggedDescription;