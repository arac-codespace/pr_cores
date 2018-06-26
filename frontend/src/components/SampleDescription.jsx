import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  infoLabel: {
    fontWeight: "bold",
    fontSize: "0.65rem",
    textTransform: "uppercase",

  },
  info: {
    marginLeft: "14px",
    fontSize: "0.85rem",
  },
};

const { classes } = jss.createStyleSheet(styles).attach();

class SampleDescription extends Component {
	render() {
		return (
      <div className={"SampleDescription"}>                
        <span className={classes.infoLabel}>
        	{this.props.label}
        </span> 
        <span className={classes.info}>
        	{this.props.info}
        </span>
      </div>
		);
	}
}

export default SampleDescription;