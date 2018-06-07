import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

import StratColumn from './StratColumn';
import LithTextures	from './svg_components/LithTextures';

// import * as d3 from "d3";

class Cores extends Component {

  render() {
    let cores = this.props.cores;
    return (
      <div className="col-12">
      	<LithTextures/>
      	{cores.map((core) => (
        	<StratColumn key={"core-key-" + core.id} core={core}/>
      	))}
      </div>
    );
  }
}

export default Cores;
