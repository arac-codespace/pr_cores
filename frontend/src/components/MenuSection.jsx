import React, { Component } from 'react';

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
    cursor: "pointer",
    margin: "0.2rem 0rem 0rem 0px",    
    "&:hover": {
      backgroundColor: "#4a6cc3",
      color: "white",
      textDecoration: "none"      
    }
  }
};

const { classes } = jss.createStyleSheet(styles).attach();
class MenuSection extends Component {

	constructor(){
		super();
		this.state={
			showInfo: false
		}
	}

	componentWillMount(){

		let showInfo = this.props.showInfo;

		this.setState({
			showInfo: showInfo ? true : false
		})
	}

	componentDidUpdate(prevProps){
		if (this.props.showInfo !== prevProps.showInfo){
			this.setState({
				showInfo: this.props.showInfo ? true : false
			})
		}
	}

	render() {

  	let handleClick = this.props.handleClick;
  	let title = this.props.title;
  	let id = this.props.id;

  	let showInfo = this.state.showInfo;
    let collapseIcon = showInfo ? " -" : " +";

    let content;
    if (showInfo){
    	content = this.props.children;
    }

		return (

			<div className="MenuSection">
	      <span 
	        className={"collapseHeader " + classes.collapseHeader} 
	        id={id} 
	        onClick={handleClick}
	      >          
	        <span>{title + collapseIcon}</span>
	      </span>
	      {content}
      </div>
		);
	}
}

export default MenuSection;