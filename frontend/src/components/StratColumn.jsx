import React, { Component } from 'react';
import Axes from './Axes'
import * as d3 from 'd3';

import ResponsiveWrapper from './ResponsiveWrapper';


class StratColumn extends Component {

	constructor(){
		super();
		this.drawColumn = this.drawColumn.bind(this);
		this.buildTransformArray = this.buildTransformArray.bind(this);
	}

	buildTransformArray(y, strata_set){
	  // For use inside the function.  This allows for the
	  // sum of successive thickness by keeping track.
	  let sumPrevThickness = 0;

	  let transformArray = strata_set.map((d, i)=>{

	  	// Store previous thickness to sum with with current
	    let prevThickness = 0;
	    let firstIndex = 0;
	    let transSum;

	    // To avoid NaN error, make the var 0 when the index is greater than 0
	    // ie.  No previous index exist before index 0/ first data array
	    if (i > firstIndex) {
	      prevThickness = parseFloat(d.previous.thickness);
	    }

	    //Sum prevThickness... depth check
	    sumPrevThickness += prevThickness;
	    transSum = y(sumPrevThickness);

	    // This is the value that will translate-y the bars right to the top of
	    // the bar located below.  IE: Stack bars.
	    return 'translate(0,' + transSum + ')';	  	
	  });	

	  return transformArray;	
	}
	drawColumn(core){

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

	  //GENERATE layer-groups
	  // Defines the previous attribute to store previous thickness value up next
	  for (let i = 0; i < strata_set.length; i++) {
	    let prevIndex = 1;
	    strata_set[i].previous = strata_set[i-prevIndex];
	  }

	  // An array that returns the transform values of each layer-group
	  let transformArray = this.buildTransformArray(y, strata_set);



	  // GENERATE lithology bars
	  // I'm creating each property bar separately/ with its 
	  // own scale to allow for future customizations...
	  let x2 = x.copy();

	  // Control width and alignment of columns
	  let X2PADDING = 0;
	  let X2ALIGN = 0;
	  x2.rangeRound([RANGEBOUNDARY, width])
	  .domain(['Lithology']).padding(X2PADDING).align(X2ALIGN);

	  // Array that will contain drawing instructions for all
	  // layers
	  let lithologyArray = []

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

	  function getTransform(lower_bound) {
	  	let yCoord = y(lower_bound)
	  	console.log(lower_bound)
	  	return 'translate(0,' + yCoord + ')';	  	

	  }

		// Populating lithologyArray
	  strata_set.map((d,i)=>{  	
	  	let obj = {
	  		width: x2.bandwidth(),
	  		height: y(parseFloat(d.thickness)),
	  		x: x2("Lithology"),
	  		fill: getLithColor(d.lithology.name),
	  		transform: getTransform(d.lower_bound),
	  	};
	  	lithologyArray.push(obj);
	  });

	  // Scales for axis creatiion...
		let xScale = x2;
		let yScale = y;

	  return (

	  	<svg className="column-svg" height={svgDimensions.height} width={svgDimensions.width}>
	  		<g className="column-container" transform={"translate(" + margins.left + ", " + margins.top + ")"}>
	  			{lithologyArray.map((d,i) => (
		  			<g className="layer-group" key={"layer-group-" + i}transform={d.transform}>
		  					<rect className="bar" fill={d.fill} width={d.width} height={d.height} x={d.x}></rect>
		  			</g>
	  			))}

	  			<Axes
	  				scales={{xScale, yScale}}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  			/>

	  		</g>
	  	</svg>
	  );  
	}

	render() {
		let core = this.props.core;
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
