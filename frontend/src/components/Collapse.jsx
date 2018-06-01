import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());
const styles = {
	collapseArrow: {
    float: "right"
  },
  details: {
    marginTop: '8px'
  }
};
const { classes } = jss.createStyleSheet(styles).attach();

class Collapse extends Component {
	render() {
		let title = this.props.title;
		let collapseId = this.props.collapseId
		return (
			<div>	
        <a data-toggle="collapse" href={"#"+collapseId} id={"collapse"+collapseId}>
          <strong>                            
            {"|| "+title}
          </strong>
          <span className={classes.collapseArrow}>^</span>
        </a>
        <div className={"collapse " + classes.details} id={collapseId}>
          <div className="card card-body">   
          	{this.props.children}                     
          </div>
        </div>
			</div>
		);
	}
}

export default Collapse;