import React, { Component } from 'react';
import * as d3 from "d3";

class CoreVis extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
          <svg>
            <g transform="translate(50,20)">
              <rect width="100" height="100"/>
            </g>
          </svg>
      </div>
    );
  }
}

export default CoreVis;
