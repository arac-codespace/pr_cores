import React, { Component } from 'react';
// import * as d3 from "d3";

class Cores extends Component {

  render() {
    let cores = this.props.cores;
    return (
      <div>
        {cores.map((core, index) => (
          <p key={core.id}>{core.id + " " + core.sample_no}</p>
        ))}
      </div>
    );
  }
}

export default Cores;
