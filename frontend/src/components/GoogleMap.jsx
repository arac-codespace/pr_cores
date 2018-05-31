import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CorePin from './CorePin'

import {chainHull_2D, sortPointX, sortPointY} from '../utils/convexHull.js'

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  constructor(){
    super();
    this.handleGoogleMapApi = this.handleGoogleMapApi.bind(this);
  }

  handleGoogleMapApi(google){

    let dataset = this.props.dataset;
    dataset.map( (data) => (

      // if boundaries exist...
      this.renderBoundaries(google, data),

      data.core_set.map((core) => (
        this.renderMarkers(google, core)
      ))
    ))
  }

  renderMarkers(google, data) {
    let myLatLng = new google.maps.LatLng(data.lat, data.lng);
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: google.map,
      title: 'Hello World!'
    });
  }

  // https://github.com/mgomes/ConvexHull
  renderBoundaries(google, data) {
    var points = [];
    var hullPoints = [];
    var hullPoints_size;

    data.core_set.map((place) => (      
      points.push(new google.maps.LatLng(place.lat, place.lng))
    ))

    // Sort the points by X, then by Y (required by the algorithm)
    points.sort(sortPointY);
    points.sort(sortPointX);

    // Returns: The number of hull points, which may differ the the hull points array’s size
    hullPoints_size = chainHull_2D(points, points.length, hullPoints); 
    
    let polyline = new google.maps.Polygon({
      map: google.map,
      paths:hullPoints, 
      fillColor:"#FF0000",
      strokeWidth:2, 
      fillOpacity:0.5, 
      strokeColor:"#0000FF",
      strokeOpacity:0.5
    });
  }

  render() {
    // let cores = this.props.cores;
    let dataset = this.props.dataset;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBfcYkj8QmEw1rlgsOXeGkHoun0d0u7e8s'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals ={true}
          onGoogleApiLoaded={this.handleGoogleMapApi}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
