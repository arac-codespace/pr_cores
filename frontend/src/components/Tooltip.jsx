import React, { Component } from 'react';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
	tooltip:{
	  position: "absolute",
	  fontSize: "0.65rem",
	  maxWidth:"400px",
	  color: "#FFFFFF",
	  background: "#000000",
	  // height: "30px",
	  // lineHeight: "30px",
	  textAlign: "center",
	  visibility: "visible",
	  borderRadius: "6px",
	  pointerEvents: "none",
	  '&:after': {
		  content: '""',
		  position: 'absolute',
		  // top: '100%',
		  // left: '50%',
		  marginLeft: '-8px',
		  width: '0', 
		  height: '0',
		  borderTop: '8px solid #000000',
		  borderRight: '8px solid transparent',
		  borderLeft: '8px solid transparent',	  	
	  }	
	},
	tooltipHidden: {
		extend: 'tooltip',
		visibility: 'hidden'		
	}
};

const { classes } = jss.createStyleSheet(styles).attach();

export default TargetComponent => (

	class Tooltip extends Component {

		constructor(props){
			super(props);
			this.state = {
				hover: false,
				tooltipContent: {},
				x: 0,
				y: 0
			}
			this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
			this.handleOnMouseOut = this.handleOnMouseOut.bind(this);		
		}	

		handleOnMouseMove(e,data){
			// console.log(e.screenX)
			this.setState({
				hover: true,
				tooltipContent: data,			
				x: e.clientX,
				y: e.clientY
			})
		}	

		handleOnMouseOut(){
			this.setState({
				hover: false
			})
		}	

		render() {

			console.log(TargetComponent)
			debugger;

			let tooltipPosition = {
				position: "absolute",
				transform: "translate(" + this.state.x + "px, " + this.state.y + "px)",
				// x: this.state.x + 15,
				// y: this.state.y - 100,
				width: "100%",
			}

			let content;
			if (this.state.hover) 
		  {
				content = (
					<span id="tooltip-content" style={tooltipPosition} className={classes.tooltip}><p>{this.state.tooltipContent.description}</p></span>
				)
			} else {
				content = (
					<span id="tooltip-content" style={tooltipPosition} className={classes.tooltipHidden}>Huh</span>
				)			
			}		
			return (
				<div id="tooltip">{content}</div>
			);
		}
	}
)