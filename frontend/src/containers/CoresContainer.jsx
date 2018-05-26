import React, { Component } from 'react';
import * as d3 from "d3";
import Cores from '../components/Cores'

class CoresContainer extends Component {

  constructor() {
    super();
    this.state = {
      cores: [],
    };
  };

  async componentDidMount() {
    try {
      const res = await fetch('/api/cores');
      const cores = await res.json();
      this.setState({
        cores
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let cores = this.state.cores;
    return (
      <div>        
        <p>CoresContainer</p>
        <Cores cores={cores} />
      </div>
    );
  }
}

export default CoresContainer;
