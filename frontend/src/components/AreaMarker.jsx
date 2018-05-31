import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());
const styles = {

};

const { classes } = jss.createStyleSheet(styles).attach();

class AreaMarker extends Component {

  render() {
    // let cores = this.props.cores;
    return (
      <div id="whereyou" className={classes.marker} title={this.props.text}>
      </div>
    );
  }
}

export default AreaMarker;
