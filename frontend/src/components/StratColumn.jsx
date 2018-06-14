import React, { Component } from 'react';
import Axes from './Axes'
import * as d3 from 'd3';

import ResponsiveWrapper from './ResponsiveWrapper';
import SandGravel from './svg_components/SandGravel';
import Sand from './svg_components/Sand';
import SandySilt from './svg_components/SandySilt';
import Silt from './svg_components/Silt';
import SiltySand from './svg_components/SiltySand';
import Clay from './svg_components/Clay';
import ForamOoze from './svg_components/ForamOoze';
import CoarseForamOoze from './svg_components/CoarseForamOoze';

import LithTextures	from './svg_components/LithTextures';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  bars: {
    stroke: "black",
    strokeWidth: "2px"
	},
	lines: {
		stroke: "black",
		strokeWidth: "2px",
		fill: "none"
	}
};

const { classes } = jss.createStyleSheet(styles).attach();

class StratColumn extends Component {

	constructor(){
		super();
		this.drawColumn = this.drawColumn.bind(this);
	}

	drawColumn(core){

		let mscl = core.mscl_set;
		console.log(mscl);
	  let strata_set = core.strata_set;
		
		let margins = {
	    top: 50,
	    right: 50,
	    bottom: 50,
	    left: 50
	  };

	  // let DIMENSIONX = 600;
	  let DIMENSIONY = 1200;

	  // Graphic max dimensions
	  let width = Math.max(this.props.parentWidth, 0) - (margins.left + margins.right);
	  let height = DIMENSIONY - margins.top - margins.bottom;	  

	  // Canvas dimensions of svg element
		let svgDimensions = {
			width: width + margins.left + margins.right, 
			height: height + margins.top + margins.bottom
		};


	  //SCALES SETUP
	  // let totalThickness = d3.sum(strata_set, function(d) {
	  //   return parseFloat(d.thickness);
	  // });

	  // depth check...
	  let RANGEBOUNDARY = 0;
    let yRange = [height, RANGEBOUNDARY];

	  // y and x axis scale    
	  let y = d3.scaleLinear();
	  let x = d3.scaleBand();

	  // Sets y-axis range
	  y.range(yRange);

	  let DOMAINBOUNDARY = 0;

	  // Sets upper domain to the max thickness.
	  y.domain([core.total_length, DOMAINBOUNDARY]);

	  // GENERATE lithology bars
	  // Control width and alignment of columns
	  let XPADDING = 0.25;
	  let XALIGN = 0;
	  x.rangeRound([RANGEBOUNDARY, width])
	  .domain(['Lithology','Wet Bulk Density', 'Magnetic Susceptivility']).padding(XPADDING).align(XALIGN);

	  // Array that will contain drawing instructions for all
	  // layers

	  function getLithColor(lithology){
	  	if (lithology === "Clay & Silt"){
	  		return "#006400";
	  	} else if (lithology === "Clay") {
	  		return "green";
	  	} else if (lithology === "Coarse Foram Ooze" || lithology === "Foram Ooze"){
	  		return "brown";
	  	} else {
	  		return "yellow";
	  	}
	  }

	  // Instead of summing thickness succesively, I'll use the lower
	  // bounds of each strata to determine the y-coordinate of the
	  // layer in pixels.  This method allows is less reliant on
	  // the order of the data.
	  function getGroupLayerTransform(lower_bound) {
	  	let yCoord = y(lower_bound)
	  	return 'translate(0,' + yCoord + ')';	  	

	  }

	  function getPatternFill(lithology_name) {
	  	switch(lithology_name){
	  		case "Gravel & Sand":
	  			return "url(#sand-gravel-pattern)";
	  		case "Sand":
	  			return "url(#sand-pattern)";
	  		case "Fine Sand":
	  			return "url(#fine-sand-pattern)";	  			
	  		case "Sandy Silt":
	  		  return "url(#sandy-silt-pattern)";
	  		case "Silt":
	  			return "url(#silt-pattern)";
	  		case "Clay & Silt":
					return "url(#clay-silt-pattern)";	  			
	  		case "Clay":
	  			return "url(#clay-pattern)";
	  		case "Silty Sand":
	  			return "url(#silty-sand-pattern)";
	  		case "Foram Ooze":
	  			return "url(#foram-ooze-pattern)";
	  		case "Coarse Foram Ooze":
	  			return "url(#coarse-foram-ooze-pattern)";	  			
	  		default:
	  			return "blue";
	  	}
	  }

		// Populating lithologyArray. This array will contain required info to 
		// draw the bars.
	  let lithologyArray = []

	  strata_set.map((d,i)=>{  	
	  	let obj = {
	  		width: x.bandwidth(),
	  		height: y(parseFloat(d.thickness)),
	  		x: x("Lithology"),
	  		fill: getLithColor(d.lithology.name),
	  		patternFill: getPatternFill(d.lithology.name),
	  		transform: getGroupLayerTransform(d.lower_bound),
	  	};
	  	lithologyArray.push(obj);
	  });


		// Drawing Density Line
	  let x2 = d3.scaleLinear().domain([1, 2]).range([0,x.bandwidth()]);

	  
	  var denityLine = d3.line()
	    .x(function(d) { return x2(d.den1); })
	    .y(function(d) { return y(d.depth); });

	  function drawDensity(denityLine, mscl){
	  	return (
	  		<g className="density">
	  			<g className="density-group" transform={"translate(" + x("Wet Bulk Density") + " ,0)"}>
	  				<path className={"line " + classes.lines } d={denityLine(mscl)} ></path>
	  			</g>
	  			<Axes
	  				orient = {"Bottom"}
	  				scale={x2}
	  				translateX = {x("Wet Bulk Density")}
	  				translateY= {height}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  			/> 	  			
	  		</g>
	  	)
	  }

	  // Drawing magnetic susceptability line
	  let x3 = d3.scaleLinear().domain([0, 100]).range([0,x.bandwidth()]);

	  
	  var magneticLine = d3.line()
	    .x(function(d) { return x3(d.ms1); })
	    .y(function(d) { return y(d.depth); });

	  function drawMagnetism(magneticLine, mscl){
	  	return (
	  		<g className="magnetism">
	  			<g className="magnetism-group" transform={"translate(" + x("Magnetic Susceptivility") + " ,0)"}>
	  				<path className={"line " + classes.lines } d={magneticLine(mscl)} ></path>
	  			</g>
	  			<Axes
	  				orient = {"Bottom"}
	  				scale={x3}
	  				translateX = {x("Magnetic Susceptivility")}
	  				translateY= {height}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  			/> 	  			  			
	  		</g>
	  	)
	  }

	  return (

	  	<svg className="column-svg" height={svgDimensions.height} width={svgDimensions.width}>
	  		<g className="column-container" transform={"translate(" + margins.left + ", " + margins.top + ")"}>
	  			{lithologyArray.map((d,i) => (
		  			<g className="layer-group" key={"layer-group-" + i}transform={d.transform}>
		  					<rect className={"bar " + classes.bars} fill={d.fill} width={d.width} height={d.height} x={d.x}></rect>
		  					<rect className={"bar " + classes.bars} fill={d.patternFill} width={d.width} height={d.height} x={d.x}></rect>
		  			</g>
	  			))}
	  			{drawDensity(denityLine, mscl)}
	  			{drawMagnetism(magneticLine, mscl)}

	  			<Axes
	  				orient = {"Left"}
	  				scale={y}
	  				translateX = {0}
	  				translateY= {0}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  			/> 
	  			<Axes
	  				orient = {"Right"}
	  				scale={y}
	  				translateX = {width}
	  				translateY= {0}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  			/> 	  			
	  			<Axes
	  				orient = {"Top"}
	  				scale={x}
	  				translateX = {0}
	  				translateY= {0}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  				tickSize={-5}
	  			/>   				  			 			
	  		</g>
	  	</svg>
	  );  
	}

	render() {
		let core = this.props.core;
		// let mscl = this.props.mscl;
		// let width = this.props.width;
		// let height = this.props.height;
		return (
			<div className={'column-component-wrapper'}>	
				{this.drawColumn(core)}
			</div>
		);
	}
}

export default ResponsiveWrapper(StratColumn);
