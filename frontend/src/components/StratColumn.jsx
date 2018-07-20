import React, { Component } from 'react';
import Axes from './strat_column_utils/Axes'
import * as d3 from 'd3';

import ResponsiveWrapper from './strat_column_utils/ResponsiveWrapper';
import SandGravel from './svg_components/SandGravel';
import Sand from './svg_components/Sand';
import SandySilt from './svg_components/SandySilt';
import Silt from './svg_components/Silt';
import SiltySand from './svg_components/SiltySand';
import Clay from './svg_components/Clay';
import ForamOoze from './svg_components/ForamOoze';
import CoarseForamOoze from './svg_components/CoarseForamOoze';

import LithTextures	from './svg_components/LithTextures';

import SampleDescription from './SampleDescription'
import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  bars: {
    stroke: "black",
    strokeWidth: "1px",
    "&:hover": {
    	fill: "rgba(255, 255, 255, 0.5)"
    }
	},
	lines: {
		stroke: "black",
		strokeWidth: "2px",
		fill: "none"
	},
	denLine: {
		extend: 'lines',
		stroke: 'red'
	},
	magLine: {
		extend: "lines",
		stroke: "green"
	},
	meanGrainLine: {
		extend: "lines",
		stroke: "blue"
	},
	header: {
		textAnchor:"middle",
		fontSize: "0.65rem"
	},
	tooltip:{
	  // position: "absolute",
	  border: "1px solid black",
	  lineHeight: "1.25rem",
	  maxWidth:"400px",
	  color: "black",
	  background: "white",
	  // height: "30px",
	  // lineHeight: "30px",
	  textAlign: "center",
	  visibility: "visible",
	  borderRadius: "6px",
	  pointerEvents: "none",
	  textAlign: "left",
      padding: "0.5rem",	
	},
	tooltipText:{
		margin: "0",
	},
	tooltipTextHeader:{
		extend: "tooltipText",
		textTransform: "uppercase",
		fontSize: "0.75rem",
		fontWeight: "bold"
	},
	tooltipHidden: {
		extend: 'tooltip',
		visibility: 'hidden',
		position: 'fixed'	
	},
	// columnWrapper: {
	// 	overflow: 'hidden',
	// }
};

const { classes } = jss.createStyleSheet(styles).attach();

class StratColumn extends Component {

	constructor(){
		super();
		this.state = {
			hover: false,
			tooltipContent: {},
			x: 0,
			y: 0
		}
		this.drawColumn = this.drawColumn.bind(this);
		this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
		this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
		this.drawGrainBars = this.drawGrainBars.bind(this);
		this.drawGrainDistribution = this.drawGrainDistribution.bind(this);
		this.drawColumn = this.drawColumn.bind(this);
		this.drawLineChart = this.drawLineChart.bind(this);

	}
	
	handleOnMouseMove(e,data){
		// console.log(e.screenX)
		let tooltipPosition = {
			position: "fixed",
			transform: "translate(" + e.clientX + "px, " + e.clientY +"px)",
		    width: "50%",
		    left: "15px",
		    top: "0",			
		}

		let boldSelection = {
			fontWeight: "bold",
			textTransform: "uppercase",
			color: "cyan"
		}

		let content;
		// Check if data is from lithology bars or grain size bars
		if (data.lithology){			
			content = (
				<div id="tooltip-content" style={tooltipPosition} className={classes.tooltip}>
					<p className={classes.tooltipTextHeader}>Interval Description</p>				
					<SampleDescription label={"Lithology:"} info={data.lithology.name}/>
					<SampleDescription label={ "Thickness (CM):"} info={data.thickness}/>
					<SampleDescription label={ "Description:"} info={data.description}/>
				</div>						
			)		
		} else {
			content = (
				<div id="tooltip-content" style={tooltipPosition} className={classes.tooltip}>
					<p className={classes.tooltipTextHeader}>Grain Size Distribution (%)</p>

					<div style={data.toBold == "Gravel" ? boldSelection : {} }>
						<SampleDescription
						 label={"Gravel Percent:"} 
						 info= {data.grainData.gravel_pct}
						/>
					</div>
					<div style={data.toBold == "Sand" ? boldSelection : {} }>
						<SampleDescription					 
						 label={"Sand Percent:"} 
						 info= {data.grainData.sand_pct}
						/>
					</div>
					<div style={data.toBold == "Silt" ? boldSelection : {} }>
						<SampleDescription					 
						 label={"Silt Percent:"} 
						 info= {data.grainData.silt_pct}
						/>
					</div>
					<div style={data.toBold == "Clay" ? boldSelection : {} }>
						<SampleDescription					 
						 label={"Clay Percent:"} 
						 info= {data.grainData.clay_pct}
						/>
					</div>
				</div>			
			)
		}
		this.setState({
			hover: true,
			tooltipContent: content,			
			x: e.clientX,
			y: e.clientY
		})
	}	

	handleOnMouseOut(){
		this.setState({
			hover: false
		})
	}


	drawColumn(core){

		let mscl = core.mscl_set;
	  let strata_set = core.strata_set;
		let grain_size = core.grainsize_set;

		// Appending total_thickness to grain_size for use in bar height calculations...
		grain_size.total_length = core.total_length
		
		let margins = {
	    top: 50,
	    right: 50,
	    bottom: 50,
	    left: 50
	  };

	  // 600px
	  let DIMENSIONX = Math.max(this.props.parentWidth, 750);
	  let DIMENSIONY = 1200;

	  // Graphic max dimensions
	  let width = DIMENSIONX - (margins.left + margins.right);
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
	  y.rangeRound(yRange);

	  let DOMAINBOUNDARY = 0;

	  // Sets upper domain to the max thickness.
	  y.domain([core.total_length, DOMAINBOUNDARY]);

	  // GENERATE lithology bars
	  // Control width and alignment of columns
	  // let XPADDING = 0.25;
	  let PADDINGOUT = 0;
	  let PADDINGIN = 0;
	  let XALIGN = 0;
	  x.rangeRound([RANGEBOUNDARY, width])
	  .domain(
	  	['Lithology','Mean Grain Size', 'Grain Size Distribution', 'Wet Bulk Density', 'Magnetic Susceptivility']
	  	).paddingOuter(PADDINGOUT)
	  .paddingInner(PADDINGIN)
	  .align(XALIGN);

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
	  		data: d
	  	};
	  	lithologyArray.push(obj);
	  });


		// Drawing Density Line
	  let x2 = d3.scaleLinear().domain([1, 2.65]).rangeRound([0,x.bandwidth()]);
	  let densityLine = d3.line()
	  	.defined(function(d){return d.den1 !== null})
	    .x(function(d) {return x2(d.den1)})
	    .y(function(d) {return y(d.depth)});


	  // Drawing magnetic susceptability line
	  let x3 = d3.scaleLinear().domain([0, 100]).rangeRound([0,x.bandwidth()]);
	  
	  let magneticLine = d3.line()
	  	.defined(function(d) {return d.ms1 !== null})	  
	    .x(function(d) {return x3(d.ms1)})
	    .y(function(d) {return y(d.depth)});


	  // Draw mean grain size line
	  let x4 = d3.scaleLinear().domain([10.0,0]).rangeRound([0,x.bandwidth()])

	  let meanGrainLine = d3.line()
	    .defined(function(d) {return d.mean_grain_size !== null})
	    .x(function(d) {return x4(d.mean_grain_size)})
	    .y(function(d) {return y(d.depth)});

    let options = {
      xDomain: null,
      scale: null,
      svgDimensions: svgDimensions,
      margins: margins,
      height: height,
      width: width,
      lineStyle: null,
      ticks: 5,
      y: y,
      showText: true,
      backgroundColor: "transparent",
    }

    options.xDomain = x("Wet Bulk Density")
    options.scale = x2
    options.lineStyle = classes.denLine
    // options.backgroundColor = "rgba(255, 0, 0, 0.05)" // red


 
    let drawDensity = this.drawLineChart(densityLine, mscl, options)
 
    options.xDomain = x("Magnetic Susceptivility")
    options.scale = x3
    options.lineStyle = classes.magLine
    // options.backgroundColor = "rgba(0, 255, 0, 0.05)" // green    
 
    let drawMagnetism = this.drawLineChart(magneticLine, mscl, options)

    options.xDomain = x("Mean Grain Size")
    options.scale = x4
    options.lineStyle = classes.meanGrainLine
    // options.backgroundColor = "rgba(0, 0, 255, 0.05)" // blue
    // options.ticks = 10
    let drawMeanGrain = this.drawLineChart(meanGrainLine, grain_size, options)

    // Prepare grain size distribution data
	  let x5 = d3.scaleLinear().domain([0,100]).rangeRound([0,x.bandwidth()])

	  options.xDomain = x("Grain Size Distribution")
	  options.scale = x5
    // options.backgroundColor = "rgba(255, 255, 0, 0.15)" // yellow


	  let drawGrainDistribution = this.drawGrainDistribution(grain_size, options)


	  let halfBandwidth = (x.bandwidth()/2)

	  return (

	  	<svg className="column-svg" height={svgDimensions.height} width={svgDimensions.width}>
	  		<g className="column-container" transform={"translate(" + margins.left + ", " + margins.top + ")"}>
		  		<g className="layers contaienr">
		  			{lithologyArray.map((d,i) => (
			  			<g className="layer-group" key={"layer-group-" + i}transform={d.transform}>
			  					<rect className={"bar " + classes.bars} fill={d.fill} width={d.width} height={d.height} x={d.x}></rect>
			  					<rect className={"bar " + classes.bars} fill={d.patternFill} width={d.width} height={d.height} x={d.x}></rect>
			  					<rect 
			  						className={"bar " + classes.bars} 
			  						fill={"transparent"} 
			  						width={d.width} 
			  						height={d.height} 
			  						x={d.x}
			  						onMouseMove = {(e)=>(this.handleOnMouseMove(e,d.data))}
			  						onMouseOut = {()=>(this.handleOnMouseOut())}
			  					></rect>

			  			</g>
		  			))}
		  		</g>
		  		<g className="headers-container">
		  			<g transform={"translate(" + x("Lithology") + " ,0)"}>
		  				<text className={classes.header} dy={-32} x={halfBandwidth}>Lithology</text>	  					  				
		  			</g>
		  			<g transform={"translate(" + x("Wet Bulk Density") + " ,0)"}>
		  				<text className={classes.header} dy={-32} x={halfBandwidth}>Wet Bulk Density (g/cm3)</text>
		  				  		
		  				<line x1={5} x2={x.bandwidth()-5} stroke="red" y1={-10} y2={-10}></line>
		  			</g>
		  			<g transform={"translate(" + x("Magnetic Susceptivility") + " ,0)"}>
		  				<text className={classes.header} dy={-32} x={halfBandwidth}>Magnetic Susceptivility (SI)</text>
		  				  						  				
		  				<line x1={5} x2={x.bandwidth()-5} stroke="green" y1={-10} y2={-10}></line>		  				  				
		  			</g>	
		  			<g transform={"translate(" + x("Mean Grain Size") + " ,0)"}>
		  				<text className={classes.header} dy={-32} x={halfBandwidth}>Mean Grain Size (phi)</text>
		  				  			
		  				<line x1={5} x2={x.bandwidth()-5} stroke="blue" y1={-10} y2={-10}></line>
		  			</g>	
		  			<g transform={"translate(" + x("Grain Size Distribution") + " ,0)"}>
		  				<text className={classes.header} dy={-32} x={halfBandwidth}>Grain Size Distribution</text>
		  				<text className={classes.header} dy={-18} x={halfBandwidth}>(x/100%)</text>
		  				  						  				
		  				<line x1={5} x2={x.bandwidth()-5} stroke="yellow" y1={-10} y2={-10}></line>		  				  				
		  			</g>		  				  			  				  			
		  		</g>
		  		{drawGrainDistribution}
	  			{drawDensity}
	  			{drawMagnetism}
	  			{drawMeanGrain}

	  			<Axes
	  				orient = {"Left"}
	  				scale={y}
	  				translateX = {0}
	  				translateY= {0}
	  				margins = {margins}
	  				svgDimensions = {svgDimensions}
	  				ticks = {20}
	  				dash = {true}
	  				showText = {true}
	  			/> 			   				  			 			
	  		</g>
	  	</svg>
	  );  
	}

	drawGrainBars(datapoint, options) {
  	const {xDomain, scale, height, margins, svgDimensions, ticks, y, backgroundColor} = options

		let gravelX = 0
		let sandX = 0
		let siltX = 0
		let clayX = 0

		/* 
			Here I'm assigning the x coordinate's starting point based on the order (G,S,Slt,C)
		*/ 
		if (datapoint.gravel_pct > 0) {

			gravelX = 0 // starting point
			sandX = scale(datapoint.gravel_pct)
			siltX = sandX + scale(datapoint.sand_pct)
			clayX = siltX + scale(datapoint.silt_pct)

		} else if (datapoint.gravel_pct == 0 && datapoint.sand_pct > 0) {

			gravelX = 0
			sandX = 0 // starting point
			siltX = scale(datapoint.sand_pct)
			clayX = siltX + scale(datapoint.silt_pct)

		} else if (datapoint.gravel_pct == 0 && datapoint.sand_pct == 0 && datapoint.silt_pct > 0) {

			gravelX = 0
			sandX = 0
			siltX = 0 // starting point
			clayX = scale(datapoint.silt_pct)
		}

		return (
				<g className="grain-draw-bars">

					<rect className={"bar " + classes.bars} 
						fill={"red"} 
						x={gravelX} 
						width={scale(datapoint.gravel_pct)} 
						height={y(parseFloat(datapoint.thickness))} 
						onMouseMove = {(e)=>(this.handleOnMouseMove(e,{toBold: "Gravel", grainData: datapoint}))}
						onMouseOut = {()=>(this.handleOnMouseOut())}
					>
					</rect>

					<rect className={"bar " + classes.bars} 
						fill={"yellow"} 
						x={sandX} 
						width={scale(datapoint.sand_pct)} 
						height={y(parseFloat(datapoint.thickness))} 
						onMouseMove = {(e)=>(this.handleOnMouseMove(e,{toBold: "Sand", grainData: datapoint}))}
						onMouseOut = {()=>(this.handleOnMouseOut())}
					>
					</rect>

					<rect className={"bar " + classes.bars} 
						fill={"blue"} 
						x={siltX} 
						width={scale(datapoint.silt_pct)} 
						height={y(parseFloat(datapoint.thickness))} 
						onMouseMove = {(e)=>(this.handleOnMouseMove(e,{toBold: "Silt", grainData: datapoint}))}
						onMouseOut = {()=>(this.handleOnMouseOut())}
					>
					</rect>

					<rect className={"bar " + classes.bars} 
						fill={"green"} 
						x={clayX} 
						width={scale(datapoint.clay_pct)} 
						height={y(parseFloat(datapoint.thickness))} 
						onMouseMove = {(e)=>(this.handleOnMouseMove(e,{toBold: "Clay", grainData: datapoint}))}
						onMouseOut = {()=>(this.handleOnMouseOut())}
					>
					</rect>
			</g>
		)
 	}

  drawGrainDistribution(data, options){
  	const {xDomain, scale, height, margins, svgDimensions, ticks, y, backgroundColor} = options

  	/* I need to calculate the 'thickness' of each interval in order to give the rects the proper height. 
			Note that depth is equivalent to upper_boundary
  	*/

  	for (let i=0; i < data.length; i++) {
  		/* first data point has no previous depth point*/
  		if (i == data.length -1) {
  		// 	data[i].thickness = data.total_length - data[i].depth // test!
  			// data[i].thickness = data.total_length - data[i].depth
  			data[i].thickness = data[i].b_depth - data[i].depth  		
  		} else {
  			// data[i].lower_bound = data[i-1].depth
  			// data[i].thickness = data[i+1].depth - data[i].depth
  			data[i].thickness = data[i].b_depth - data[i].depth
  		// debugger; 			
  		}
  	}
  	// debugger;

  	/* Need to calculate x position */

  	return (
  		<g className="grain-dist">
				<g className="grain-dist-bg" transform={"translate(" + xDomain + " ,0)"}>  				
					<rect className="graph-background" fill={backgroundColor} height={height} width={scale.range()[1]}></rect>
					<g className="tick" opacity="1" transform="translate(0,0)">
						<line stroke="#000" y2="1100"></line>
					</g>	
					<g className="tick" opacity="1" transform={"translate(" + scale.range()[1] + ",0)"}>						
						<line stroke="#000" y2="1100"></line>				  				
					</g>											
				</g>  		
	  		{data.map( (d,i) => (
  				<g className="grain-dist-chart" key={"grain-dist-" + i} transform={"translate(" + xDomain + " ," + y(parseFloat(d.depth)) + ")"}>
	  				{this.drawGrainBars(d, options)}
  				</g>
	  		))} 				  			
  		</g>
  	)
  }

  drawLineChart(valueLine, pointData, options){
  	const {xDomain, scale, height, margins, svgDimensions, lineStyle, ticks, showText, backgroundColor} = options
  	// sort pointData by depth!
		let sortedData = pointData.sort((a, b) => parseFloat(a.depth) - parseFloat(b.depth));
		// debugger;

  	return (
  		<g className="line-chart">
  			<g className="line-chart-group" transform={"translate(" + xDomain + " ,0)"}>
  				<rect height={height} width={scale.range()[1]} fill={backgroundColor}></rect>
  				<path className={lineStyle} d={valueLine(sortedData)}></path>
  			</g>
  			<Axes
  				orient = {"Bottom"}
  				scale={scale}
  				translateX = {xDomain}
  				translateY= {height}
  				margins = {margins}
  				svgDimensions = {svgDimensions}
  				ticks = {ticks ? ticks : 5}
  				showText = {showText}
  			/> 
  			<Axes
  				orient = {"Top"}
  				scale={scale}
  				translateX = {xDomain}
  				translateY= {0}
  				margins = {margins}
  				svgDimensions = {svgDimensions}
  				ticks = {ticks? ticks: 5}
  				showText = {showText}
  			/>   				  			
  		</g>
  	)
  }

	render() {
		let core = this.props.core;
		// console.log(e.screenX)
		
		let content;
		if (this.state.hover) 
	  {
			content = this.state.tooltipContent 		
		} else {
			content = (<div className={classes.tooltipHidden}></div>)
		}
		// let mscl = this.props.mscl;
		// let width = this.props.width;
		// let height = this.props.height;
		return (
			<div className={classes.columnWrapper}>	
				<div id="tooltip">{content}</div>
				{this.drawColumn(core)}
			</div>
		);
	}
}

export default ResponsiveWrapper(StratColumn);
