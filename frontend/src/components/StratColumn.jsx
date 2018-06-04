import React, { Component } from 'react';

import * as d3 from 'd3';

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

		let margin = {
	    top: 50,
	    right: 50,
	    bottom: 50,
	    left: 50
	  };

	  let strata_set = core.strata_set;

	  let DIMENSIONX = 600;
	  let DIMENSIONY = 1200;

	  // Graphic max dimensions
	  let width = DIMENSIONX - margin.left - margin.right;
	  let height = DIMENSIONY - margin.top - margin.bottom;	  

	  // Canvas dimensions of svg element
	  let canvasWidth = width + margin.left + margin.right;
	  let canvasHeight = height + margin.top + margin.bottom;

	  // The following is to find the proportion between the smallest layer
	  // and the total thickness
	  let minThickness = d3.min(strata_set, function(d) {
	    return parseFloat(d.thickness);
	  });

	  let totalThickness = d3.sum(strata_set, function(d) {
	    return parseFloat(d.thickness);
	  });

	  // MINLAYERHEIGHT:Height == minThickness:totalThickness
	  let minMaxProportionality = minThickness/totalThickness;

	  // Finds the pixel height when height = DIMENSIONY...
	  let currentMinHeight = minMaxProportionality*height;


	  // If the currentMinHeight is less than MINLAYERHEIGHT, calculate a new
	  // height that would result in the minThickness having a height of
	  // MINLAYERHEIGHT
	  let MINLAYERHEIGHT = 32;
	  let dynHeight = MINLAYERHEIGHT/minMaxProportionality;
	  let FIRSTLAYERINDEX = 0;

	  // Sets height
	  if (currentMinHeight < MINLAYERHEIGHT) {
	    height = dynHeight;
	  }

	  // depth check...
	  let RANGEBOUNDARY = 0;
    let yRange = [height, RANGEBOUNDARY];

	  // y and x axis scale    
	  let y = d3.scaleLinear();
	  let x = d3.scaleBand();

	  // Sets y-axis range
	  y.range(yRange);

	  // debugger;

	  let DOMAINBOUNDARY = 0;

	  // Sets upper domain to the max thickness.
	  y.domain([totalThickness, DOMAINBOUNDARY]);
	  // Defines the previous function to store previous thickness value up next
	  for (let i = 0; i < strata_set.length; i++) {
	    let prevIndex = 1;
	    strata_set[i].previous = strata_set[i-prevIndex];
	  }

	  let transformArray = this.buildTransformArray(y, strata_set);

	  // LITHOLOGY Color!
	  let x2 = x.copy();
	  // Control width and alignment of columns
	  let X2PADDING = 0.5;
	  let X2ALIGN = 0;
	  x2.rangeRound([RANGEBOUNDARY, width])
	  .domain(['Lithology']).padding(X2PADDING).align(X2ALIGN);

	  // Array that will contain drawing instructions for all
	  // layers
	  let lithologyArray = []

		// Populating lithologyArray
	  strata_set.map((d,i)=>{  	

	  	let obj = {
	  		width: x2.bandwidth(),
	  		height: y(parseFloat(d.thickness)),
	  		x: x2("Lithology"),
	  		fill: "black",
	  		transform: transformArray[i],
	  	};
	  	lithologyArray.push(obj);
	  });


	  // GET axis instructions...

	  let TICKSIZE = 0;
	  let XTRANSLATETOP = 0;
	  let YTRANSLATETOP = 0;

	  let axisGroup = {
	  	transform: "translate(" + XTRANSLATETOP +", " + YTRANSLATETOP +")",
	  	fill: "none",
	  	fontSize: 10,
	  	fontFamily: "sans-serif",
	  	textAnchor: "middle",
	  }
	
	  let axisPath = {
	  	dWidth: width + 0.5,	
	  	stroke: "red",
	  }

	  let tickXCoord = ((x2.bandwidth()/2) + x2("Lithology"));
	  let tickYCoord = 0;
	  let tickTransform = "translate(" + tickXCoord + ", " + tickYCoord + ")"

	  let tickOpts = {
	  	transform: tickTransform,
	  }

	  return (

	  	<svg className="column-svg" height={canvasHeight} width={canvasWidth}>
	  		<g className="column-container" transform={"translate(" + margin.left + ", " + margin.top + ")"}>
	  			{lithologyArray.map((d,i) => (
		  			<g className="layer-group" key={"layer-group-" + i}transform={d.transform}>
		  					<rect className="bar" fill={d.fill} width={d.width} height={d.height} x={d.x}></rect>
		  			</g>
	  			))}

	  			<g className="axis axis--x" 
	  				 transform={axisGroup.transform} 
	  				 fill={axisGroup.fill} 
	  				 fontSize={axisGroup.fontSize} 
	  				 fontFamily={axisGroup.fontFamily} 
	  				 textAnchor={axisGroup.textAnchor}
	  			>
	  					<path className="domain" stroke={axisPath.stroke} d={"M0.5,0 V0.5 H" + axisPath.dWidth + "V0"}></path>
							<g className="tick" opacity="1" transform={tickOpts.transform}>
								<line stroke="#000" y2="-6"></line>
							</g>	  					
	  			</g>

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

export default StratColumn;
