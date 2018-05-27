import React, { Component } from 'react';
import Surveys from '../components/Surveys'

class SurveysContainer extends Component {
 
  constructor() {
    super();
    this.state = {
      surveys: [],
    };
  };

  async componentDidMount() {
    try {
      const res = await fetch('/api/surveys');
      const surveys = await res.json();
      this.setState({
        surveys
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let surveys = this.state.surveys
    return (
        <Surveys surveys = {surveys}/>
    );
  }
}

export default SurveysContainer;
