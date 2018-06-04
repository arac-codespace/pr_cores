import React, { Component } from 'react';
import * as d3 from "d3";
import Cores from '../components/Cores'

class CoresContainer extends Component {

  constructor() {
    super();
    this.state = {
      cores: [],
      isDataLoaded: false
    };
  };

  async componentDidMount() {
    try {
      const res = await fetch('/api/cores');
      const cores = await res.json();
      this.setState({
        cores,
        isDataLoaded: true
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let cores = this.state.cores;
    if (this.state.isDataLoaded){      
      return (
        <Cores cores={cores} />
      );
    } else {
      return (<p>Loading...</p>);
    }
  }
}

export default CoresContainer;
