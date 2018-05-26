import React, { Component } from 'react';
// import './App.css';

import CoreVis from './components/CoreVis.jsx';
class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        	<p>Wow, this is actually working...???</p>
          <CoreVis/>
        </div>
      </div>
    );
  }
}

export default App;
