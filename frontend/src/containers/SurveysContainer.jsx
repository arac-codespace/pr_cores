import React, { Component } from 'react';
import Surveys from '../components/Surveys'

class SurveysContainer extends Component {
 
  constructor() {
    super();
    this.state = {
      surveys: [],
      isLoaded: false
    };
  };

  async componentDidMount() {
    try {
      const res = await fetch('/api/surveys');
      const surveys = await res.json();
      this.setState({
        surveys: surveys,
        isLoaded: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let surveys = this.state.surveys
    if (this.state.isLoaded) {
      return (
        <Surveys surveys = {surveys}/>
      );
    } else {
      return (
        <p>Loading...</p>
      )
    }
  }
}

export default SurveysContainer;
