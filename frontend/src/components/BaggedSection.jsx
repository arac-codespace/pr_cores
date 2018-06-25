import React, { Component } from 'react';
import BaggedDescription from './BaggedDescription';

import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
  collapseHeader: {
    backgroundColor: "#2e374e",
    fontSize: "1rem",
    display: "block",
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",    
    margin: "0.2rem 0rem 0rem 0px",    
    "&:hover": {
      backgroundColor: "#4a6cc3",
      color: "white",
      textDecoration: "none"      
    }
  }
};

const { classes } = jss.createStyleSheet(styles).attach();
class BaggedSection extends Component {

	constructor(){
		super();
		this.state={
			showInfo: false
		}
		// this.handleClick = this.handleClick.bind(this);
	}

	componentWillMount(){

		let markerInfo = this.props.markerInfo;

		this.setState({
			showInfo: markerInfo.openBagged ? true : false
		})
	}

	componentDidUpdate(prevProps){
		if (this.props.markerInfo !== prevProps.markerInfo){
			this.setState({
				showInfo: this.props.markerInfo.openBagged ? true: false
			})
		}
	}

	// handleClick(){
	// 	this.setState(prevState=>({
	// 		showInfo: !prevState.showInfo
	// 	}))
	// }

	render() {

		let handleBaggedSectionClick = this.props.handleBaggedSectionClick;

		let bags = this.props.bags;
		let markerInfo = this.props.markerInfo;

		let showInfo = this.state.showInfo

    let collapseIcon = showInfo ? " -" : " +";
		
		let samples;
		if (showInfo){
    	samples = bags.map((bag,index) => (
    		<BaggedDescription key={bag.sample_no + bag.id} bag={bag} markerInfo={markerInfo}/>
    	))    
		}

		return (

			<div>
	      <a 
	        className={"collapseHeader " + classes.collapseHeader} 
	        id={"BaggedDescriptionAnchor"} 
	        onClick={handleBaggedSectionClick}
	      >          
	        <span>{"Bagged Samples" + collapseIcon}</span>
	      </a>
	      {samples}
      </div>
		);
	}
}

export default BaggedSection;