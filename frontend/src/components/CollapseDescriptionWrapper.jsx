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
      if (this.props.isSurvey){
        let survey = this.props.survey;
        this.setState({
          showInfo: markerInfo.surveyNo == survey.survey_no ? true : false,
        })        
      } else {
        let sample = this.props.sample;
        this.setState({
          showInfo: markerInfo.sampleNo == sample.sample_no ? true : false,
        })
      }
    }

    componentDidUpdate(prevProps){
      if (this.props.markerInfo !== prevProps.markerInfo){
        
        if (this.props.isSurvey){
          let markerInfo = this.props.markerInfo;
          let survey = this.props.survey;

          this.setState({
            showInfo: markerInfo.surveyNo == survey.survey_no ? true : false
          })
        } else {          
          let markerInfo = this.props.markerInfo;
          let sample = this.props.sample;

          this.setState({
            showInfo: markerInfo.sampleNo == sample.sample_no ? true : false
          })
        }
      }
    }

    handleClick(){
      this.setState(prevState => ({
        showInfo: !prevState.showInfo
      }))
    }

    render() {

    // let sample = this.props.sample;
    let showInfo = this.state.showInfo;
    let markerInfo = this.props.markerInfo;
    let collapseIcon = showInfo ? " -" : " +";
    let style = this.props.style;


    let data;
    let scrollCondition;
    let id;
    let title;

    if (this.props.isSurvey){
      data = this.props.survey;
      scrollCondition = data.survey_no === markerInfo.surveyNo;
      id = "anchor"+data.survey_no;
      title = data.survey_no + collapseIcon;
    } else {
      data = this.props.sample;
      scrollCondition = data.sample_no === markerInfo.sampleNo;
      id = "anchor"+data.sample_no;
      title = data.sample_no + collapseIcon;;
    }

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
            if (scrollCondition){
              if (node){
                node.scrollIntoView();
              }
            }
          }}
            className={"collapseHeader " + (style ? style : classes.collapseHeader)} 
            id={id} 
            onClick={this.handleClick}
          >          
            <span>{title}</span>
          </span>
          {content}
        </div>
      )
    }
  }
)