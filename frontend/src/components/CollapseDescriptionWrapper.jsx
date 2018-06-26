import React, { Component } from 'react'
import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());

// MapButton zIndex: 999999
const styles = {
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
    cursor: "pointer",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#0eb255",
      textDecoration: "none"      
    }
  },
};

const { classes } = jss.createStyleSheet(styles).attach();


// https://medium.com/@caspg/responsive-chart-with-react-and-d3v4-afd717e57583
export default DescriptionComponent => (
  class CollapseDescriptionWrapper extends Component {

    constructor(){
      super();
      this.state = {
        showInfo: false
      }

      this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
      let markerInfo = this.props.markerInfo;
      let sample = this.props.sample;
      
      this.setState({
        showInfo: markerInfo.sampleNo == sample.sample_no ? true : false,
      })
    }

    componentDidUpdate(prevProps){
      if (this.props.markerInfo !== prevProps.markerInfo){
        
        let markerInfo = this.props.markerInfo;
        let sample = this.props.sample;

        this.setState({
          showInfo: markerInfo.sampleNo == sample.sample_no ? true : false
        })
      }
    }

    handleClick(){
      this.setState(prevState => ({
        showInfo: !prevState.showInfo
      }))
    }

    render() {

    let sample = this.props.sample;
    let showInfo = this.state.showInfo;
    let markerInfo = this.props.markerInfo;
    let collapseIcon = showInfo ? " -" : " +";

    let content;
    if (showInfo){
      content = (
        <DescriptionComponent {...this.props}/>   
      )
    }

      return (
        <div className="DescriptionWrapper">
          <span 
          ref = {node => {
            if (sample.sample_no === markerInfo.sampleNo){
              if (node){
                node.scrollIntoView();
              }
            }
          }}
            className={"collapseHeader " + classes.collapseHeader} 
            id={"anchor"+sample.sample_no} 
            onClick={this.handleClick}
          >          
            <span>{sample.sample_no + collapseIcon}</span>
          </span>
          {content}
        </div>
      )
    }
  }
)