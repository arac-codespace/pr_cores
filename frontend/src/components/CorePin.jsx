import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

const K_WIDTH = 20;
const K_HEIGHT = 20;

// MapButton zIndex: 999999
const styles = {
	marker: {		
		position: 'absolute',
		width: K_WIDTH,
		height: K_HEIGHT,
		left: -K_WIDTH / 2,
		top: -K_HEIGHT / 2,

		border: '5px solid #f44336',
		borderRadius: K_HEIGHT,
		backgroundColor: '#872019',
		textAlign: 'center',
		color: '#872019',
		fontSize: 16,
		fontWeight: 'bold',
		padding: 4
	}
};

const { classes } = jss.createStyleSheet(styles).attach();

class CorePin extends Component {

  render() {
    // let cores = this.props.cores;
    return (
      <div id="whereyou" className={classes.marker} title={this.props.text}>
      </div>
    );
  }
}

export default CorePin;
