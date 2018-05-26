import React, { Component } from 'react';
// import * as d3 from "d3";

class Surveys extends Component {

  render() {
    let surveys = this.props.surveys;
    return (
      <div>
        {surveys.map((survey, index) => (
          <p key={survey.id}>{survey.id + " " + survey.survey_no + " " + survey.ship}</p>
        ))}
      </div>
    );
  }
}

export default Surveys;
