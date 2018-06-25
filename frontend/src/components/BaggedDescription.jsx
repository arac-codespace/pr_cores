import React, { Component } from 'react';
import SampleDescription from './SampleDescription';


import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  descriptionWrapper: {
    marginBottom: "1rem",
    padding: "0.5rem 1.5rem",
    backgroundColor: "#ffffffb5", 
    border: "1px solid #cfcfcf",   
  },
  columnContainer: {
    extend: "descriptionWrapper",
    overflowX: 'auto',
  },
  section: {
    margin: "1rem 0px"
  },
  collapseHeader: {
    color: "white",
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    textTransform: "uppercase",
    fontSize: "0.8rem",
    textDecoration: "none",
    backgroundColor: "#21854c",  
    display: "block",  
    textAlign: "center",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#0eb255",
      textDecoration: "none"      
    }
  },
};

const { classes } = jss.createStyleSheet(styles).attach();
class BaggedDescription extends Component {

	constructor(){
		super();
		this.state = {
			showInfo: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentWillUnmount(){
		console.log("UNMOUNT")
	}
	componentDidMount(){
		let markerInfo = this.props.markerInfo;
		let bag = this.props.bag;
		
		this.setState({
			showInfo: markerInfo.sampleNo == bag.sample_no ? true : false,
		})
	}

	componentDidUpdate(prevProps){
		if (this.props.markerInfo !== prevProps.markerInfo){
			
			let markerInfo = this.props.markerInfo;
			let bag = this.props.bag;

			this.setState({
				showInfo: markerInfo.sampleNo == bag.sample_no ? true : false
			})
		}
	}

	handleClick(){
		this.setState(prevState => ({
			showInfo: !prevState.showInfo
		}))
	}

	render() {

		let bag = this.props.bag;
		let showInfo = this.state.showInfo;
		let markerInfo = this.props.markerInfo;

    let collapseIcon = showInfo ? " -" : " +";

		let content;
		if (showInfo){
			content = (
	      <div className={classes.descriptionWrapper}>
	        <SampleDescription label={"Sample No:"} info={bag.sample_no}/>
	        <SampleDescription label={"Latitude:"} info={bag.lat}/>
	        <SampleDescription label={"Longitude:"} info={bag.lng}/>
	        <SampleDescription label={"Date Collected:"} info={bag.date_coll}/>
	        <SampleDescription label={"Collected By:"} info={bag.collected_by}/>
	        <SampleDescription label={"Description:"} info={bag.description}/>    
	      </div>			
			)
		}
		return (
			<div>
	      <a 
	      ref = {node => {
	      	if (bag.sample_no === markerInfo.sampleNo){
	      		// debugger;
	      		// console.log(this);
	      		if (node){
	      			node.scrollIntoView();
	      		}
	      	}
	      }}
	        className={"collapseHeader " + classes.collapseHeader} 
	        id={"anchor"+bag.sample_no} 
	        onClick={this.handleClick}
	      >          
	        <span>{bag.sample_no + collapseIcon}</span>
	      </a>
	      {content}
			</div>
		);
	}
}

export default BaggedDescription;