import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  header: {
		display: "block",
    color: "white",
    padding: "0.5rem",
    backgroundColor: "#2e374e",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};

const { classes } = jss.createStyleSheet(styles).attach();


class Header extends Component {
	render() {
		return (
			<span className={"HeaderComponent " + classes.header}>{this.props.text}</span>
		);
	}
}

export default Header;