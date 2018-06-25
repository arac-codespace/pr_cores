import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());
const styles = {
  details: {
    marginTop: '8px'
  },
  anchor: {
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
  decorator: {
    fontSize: "16px",
    marginRight: "6px"    
  }
};
const { classes } = jss.createStyleSheet(styles).attach();

class Collapse extends Component {

  constructor(props){
    super(props)
    this.state={
      isOpen: false
    }
    this.handleClick = this.handleClick.bind(this)
  }


  handleClick(target){

    this.setState(prevState=>({
      isOpen: !prevState.isOpen
    }))
  }

  render() {
		let title = this.props.title;
		let collapseId = this.props.collapseId
    let titleStyle = this.props.titleStyle;

    let isOpen = this.state.isOpen;
    let collapseIcon = isOpen ? " -" : " +";

    let collapseDetails;

    if (isOpen){
      collapseDetails = this.props.children
    }

    // console.log(isOpen);

    return (
      <div className="CollapseComponent"> 
        <a 
          ref={node=> this.node = node}
          className={"collapseHeader " + (titleStyle ? titleStyle : classes.anchor)} 
          id={"collapse"+collapseId} 
          onClick={this.handleClick}
        >          
          <span>{title + collapseIcon}</span>
        </a>
        <div
          className={"collapseableDiv"}
          id={collapseId}
        >   
          {collapseDetails}                   
        </div>
			</div>
		);
	}
}

export default Collapse;