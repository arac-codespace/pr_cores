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
      containerWidth: null,
      isCollapsed: true
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleCollapse = this.handleCollapse.bind(this)
  }

  handleCollapse(event){
    console.log("Hey! I focused and should scroll...")
    // this.anchor.scrollIntoView();
  }

  handleClick(){

    let isCollapsed = document.getElementById("collapse" + this.props.collapseId).classList.contains("collapsed");
    this.setState(prevState=>({
      containerWidth: document.getElementById(this.props.collapseId).getBoundingClientRect().width,
      isCollapsed: isCollapsed
    }))
  }

  render() {
		let title = this.props.title;
		let collapseId = this.props.collapseId
    let titleStyle = this.props.titleStyle;
    let awaitWidth = this.props.awaitWidth;

    let isCollapsed = this.state.isCollapsed;
    let collapseIcon = isCollapsed ? " +" : " -";

    let collapseDetails;

    if (awaitWidth) {
      collapseDetails = this.state.containerWidth > 0 && this.state.containerWidth !== null ? 
      this.props.children
      :
      <p>Not loaded</p>      
    } else {
      collapseDetails = this.props.children
    }

    return (
      <div className="CollapseComponent"> 
        <a 
          className={"collapseHeader collapsed " + (titleStyle ? titleStyle : classes.anchor)} 
          data-toggle="collapse" 
          href={"#"+collapseId} 
          id={"collapse"+collapseId} 
          onClick={this.handleClick}
        >          
          <span>{title + collapseIcon}</span>
        </a>
        <div 
          className={"collapse"}
          id={collapseId}
        >   
          {collapseDetails}                   
        </div>
			</div>
		);
	}
}

export default Collapse;