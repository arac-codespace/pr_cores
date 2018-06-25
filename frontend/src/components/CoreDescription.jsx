import React, { Component } from 'react';
import Collapse from './Collapse'
import StratColumn from './StratColumn';
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

class CoreDescription extends Component {

	constructor(){
		super();
		this.state = {
			showInfo: false
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		let markerInfo = this.props.markerInfo;
		let core = this.props.core;

			this.setState({
				showInfo: markerInfo.sampleNo == core.sample_no ? true : false,
			})
	}

	componentDidUpdate(prevProps){
		if (this.props.markerInfo !== prevProps.markerInfo){
			
			let markerInfo = this.props.markerInfo;
			let core = this.props.core;

			this.setState({
				showInfo: markerInfo.sampleNo == core.sample_no ? true : false
			})
		}
	}

	handleClick(){
		this.setState(prevState => ({
			showInfo: !prevState.showInfo
		}))
	}

	render() {

		let core = this.props.core;
		let showInfo = this.state.showInfo;
    let collapseIcon = showInfo ? " -" : " +";

		let content;
		if (showInfo){
			content = (
        <div className={classes.descriptionWrapper}>
          <SampleDescription label={"Sample No:"} info={core.sample_no}/>
          <SampleDescription label={"Latitude:"} info={core.lat}/>
          <SampleDescription label={"Longitude:"} info={core.lng}/>
          <SampleDescription label={"Date Collected:"} info={core.date_coll}/>
          <SampleDescription label={"Collected By:"} info={core.collected_by}/>
          <SampleDescription label={"Core Type:"} info={core.core_type}/>
          <SampleDescription label={"Length:"} info={core.total_length}/>
          <SampleDescription label={"Depth:"} info={core.depth}/>
          <SampleDescription label={"Core Condition:"} info={core.core_condition}/>
          <SampleDescription label={"Described By:"} info={core.described_by}/>
          <SampleDescription label={"Location:"} info={core.physiographic_location}/>
          <SampleDescription label={"Date Described:"} info={core.date_described}/>
          <div className={classes.section}>
            <Collapse title={"Visualization"} collapseId={"ColumnCollapse"+core.id} getWidth={this.getWidth} awaitWidth={true}>  
              <div className = {classes.columnContainer}>
                <StratColumn core={core}/>
              </div>
            </Collapse>
          </div>
        </div>		
			)
		}

		return (
			<div>
	      <a 
	        className={"collapseHeader " + classes.collapseHeader} 
	        id={core.sample_no + "anchor"} 
	        onClick={this.handleClick}
	      >          
	        <span>{core.sample_no + collapseIcon}</span>
	      </a>
	      {content}
			</div>

		);
	}
}

export default CoreDescription