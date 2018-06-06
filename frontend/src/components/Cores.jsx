import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

import StratColumn from './StratColumn';

// import * as d3 from "d3";

class Cores extends Component {

  render() {
    let cores = this.props.cores;
    return (
      <div className="col-12">
        <StratColumn core={cores[0]}/>
      </div>
    );
  }
}

export default Cores;
