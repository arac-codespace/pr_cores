import React, { Component } from 'react';
import Survey from '../components/Survey';


class SurveyContainer extends Component {

	constructor() {
		super();
		this.state = {
			survey: [],
      isLoaded: false,
		}
	}

  async componentDidMount() {
  	const surveyId = this.props.match.params;
  	let url = '/api/surveys/' + surveyId.id;
    try {
      const res = await fetch(url);
      const survey = await res.json();
      this.setState({
        survey: survey,
        isLoaded: true
      });
    } catch (e) {
      console.log(e);
    }
  }

	render() {
    let survey = this.state.survey;
    if (this.state.isLoaded) {      
  		return (
  			<Survey survey={survey}/>
  		);
    } else {
      return (
        <p>Loading...</p>
      )
    }
	}
}

export default SurveyContainer;