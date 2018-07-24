import React, { Component } from 'react';
import {Scene, loadModules } from 'react-arcgis';
import ArcColumn from '../components/ArcColumn';


class ArcGis extends Component {

	render() {
    console.log(<ArcColumn/>)
    return (
      <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'hybrid' }}
        viewProperties={{
            // It's lng, lat for some reason...
            center: [-66.105721 , 18.2208328],
            zoom: 10
        }}
      > 
        <ArcColumn/>
      </Scene>  
    )
	}
}

export default ArcGis;
