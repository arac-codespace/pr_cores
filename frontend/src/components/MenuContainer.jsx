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
    overflowX: 'hidden',
    overflowY: "scroll",
    // marginTop:"32px",
    // paddingTop: "30px"
  },
    menuContainer: {
    width: "100%",
    padding: "44px 10px 16px 14px",
    // brings menu below button edge
    // paddingTop:"40px",
    height: "100%",
    top: "0",
    left: "0",
    zIndex: "9999",
    position: "absolute",
    visibility: "hidden",
  },
  menuContainerActive: {
    extend: "menuContainer",
    visibility: "visible",
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

class MenuContainer extends Component {
	render() {
		return (
            <div id={this.props.id} className={"col-lg-6 col-12 MenuContainerComponent " + classes.menuContainerActive}>                 
                <div className={classes.menu} ref={node=>{this.node=node;}}>
				    {this.props.children}
                </div>
            </div>
		);
	}
}

export default MenuContainer;
