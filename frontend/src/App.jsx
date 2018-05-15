import React, { Component } from 'react';
import './App.css';

import CoreVis from './CoreVis.jsx';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <CoreVis/>
        </div>
      </div>
    );
  }
}

export default App;
