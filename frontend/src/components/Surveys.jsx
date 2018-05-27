import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

// import * as d3 from "d3";

class Surveys extends Component {

  render() {
    let surveys = this.props.surveys;
    return (
      <div className="surveys col-12">
        <div className="row">
          <div className = "col-12 col-lg-3">
            <h3>Surveys</h3>
            {surveys.map((survey, index) => (
              <div key={survey.id + survey.survey_no}>    
                <div id="survey-accordion">
                  <div class="card">
                    <div class="card-header">
                      <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target={"#survey_"+survey.id}>
                          {"Survey No: " + survey.survey_no}
                        </button>
                      </h5>
                    </div>

                    <div id={"survey_"+survey.id} class="collapse" data-parent="#survey-accordion">
                      <div class="card-body">
                        <p>{"Ship: " + survey.ship}</p>
                        <p>{"Samples collected: " + survey.total_samples}</p>
                        <p>{"Core samples: " + survey.core_quant}</p>                                                
                        <p>{"Bagged samples: " + survey.bag_quant}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>          
            ))}
          </div>
          <div className="col-12 col-lg-9">
            <GoogleMap/>      
          </div>
        </div>
      </div>
    );
  }
}

export default Surveys;
