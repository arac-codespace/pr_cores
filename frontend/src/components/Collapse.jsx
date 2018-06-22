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
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.isCollapsed !== prevState.isCollapsed) {
      // debugger;
      console.log("Hey, I'm update")
    }
  }

  handleClick(target){

    // let isCollapsed = document.getElementById("collapse" + this.props.collapseId).classList.contains("collapsed");
    this.setState(prevState=>({
      containerWidth: document.getElementById(this.props.collapseId).getBoundingClientRect().width,
      isCollapsed: !prevState.isCollapsed
    }))
  }

  scrollTo(){
    document.getElementById("collapse"+this.props.collapseId).scrollIntoView();
  }

  render() {
		let title = this.props.title;
		let collapseId = this.props.collapseId
    let titleStyle = this.props.titleStyle;
    let awaitWidth = this.props.awaitWidth;

    let isCollapsed = this.state.isCollapsed;
    let collapseIcon = isCollapsed ? " +" : " -";

    // awaitWidth means that the details will only be loaded when the collapse
    // space is available.  This allows ResponsiveWrapper to calculate available
    // space properly and pass it to StratColumn. Otherwise, ResponsiveWrapper would
    // pass 0 to StratColumn and StratColumn would default to the minWidth specified.

    // Note that since the component starts collapsed, getting the available space during
    // componentDidMount is not very straightforward.

    let collapseDetails;
    if (awaitWidth) {
      collapseDetails = this.state.containerWidth > 0 && this.state.containerWidth !== null ? 
      this.props.children
      :
      <p>Not loaded</p>      
    } else {
      collapseDetails = this.props.children
    }

    console.log(isCollapsed);

    return (
      <div className="CollapseComponent"> 
        <a 
          ref={node=> this.node = node}
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