import React, { Component } from 'react';

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
    marginTop:"32px",
    // paddingTop: "30px"
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

class MenuContainer extends Component {
	render() {
		return (
			<div className={classes.menu} ref={node=>{this.node=node;}}>
				{this.props.children}
			</div>
		);
	}
}

export default MenuContainer;
