import React, { Component } from 'react';
import GoogleMap from './GoogleMap'

import StratColumn from './StratColumn';
import LithTextures	from './svg_components/LithTextures';
import data from '../assets/json/5GGC_MSCL.json'


// import * as d3 from "d3";

class Cores extends Component {
  constructor(){
    super();
    this.state={
      mscl: null,
    }
  }

  componentWillMount(){
    this.setState({
      mscl: data,
    })
  }

        // <LithTextures/>
        // {cores.map((core) => (
        //   <StratColumn key={"core-key-" + core.id} core={core} mscl={this.state.mscl}/>
        // ))}
  render() {

    let cores = this.props.cores;
    return (
      <div className="col-12">
        <StratColumn core={cores[0]} mscl={this.state.mscl}/>
      </div>
    );
  }
}

export default Cores;
