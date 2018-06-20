import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

// One time setup with default plugins and settings.
jss.setup(preset());
const styles = {
	collapseArrow: {
    float: "right"
  },
  details: {
    marginTop: '8px'
  }
};
const { classes } = jss.createStyleSheet(styles).attach();

class Collapse extends Component {

  constructor(props){
    super(props)
    this.state={
      containerWidth: null,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  // componentDidMount(){
  //   this.setState({
  //     containerWidth: document.getElementById(this.props.collapseId).getBoundingClientRect().width,
  //   })
  // }

  handleClick(){
    this.setState({
      containerWidth: document.getElementById(this.props.collapseId).getBoundingClientRect().width
    })
  }

  render() {
    console.log(this.props.title)
    console.log(this.state.containerWidth)
		let title = this.props.title;
		let collapseId = this.props.collapseId
		return (
			<div>	
        <a data-toggle="collapse" href={"#"+collapseId} id={"collapse"+collapseId} onClick={this.handleClick}>
          <strong>                            
            {"|| "+title}
          </strong>
          <span className={classes.collapseArrow}>^</span>
        </a>
        <div className={"collapse " + classes.details} id={collapseId}>
          <div className="card card-body">   
          	{this.state.containerWidth > 0 && this.state.containerWidth !== null ?
              this.props.children
              :
              <p>Huh...</p>
            }                     
          </div>
        </div>
			</div>
		);
	}
}

export default Collapse;