import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

const styles = {
  mapButtonContainer: {
    position: "absolute", 
    zIndex: "999999",
    marginTop: "10px",
    marginLeft: "14px"
  },
  mapButton: {
    borderRadius: "0",
  }
};



const { classes } = jss.createStyleSheet(styles).attach();
class MapButton extends Component {
  render() {
    let text = this.props.text;
    let handleClickSurveys = this.props.handleClickSurveys;
    return (
      <div className={classes.mapButtonContainer} onClick={()=> {handleClickSurveys()}}>
        <button className={"btn btn-primary btn-sm " + classes.mapButton}>{text}</button>
      </div>
    );
  }
}

export default MapButton;
