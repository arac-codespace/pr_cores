import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CorePin from './CorePin'

import {chainHull_2D, sortPointX, sortPointY} from '../utils/convexHull.js'
import {MarkerClusterer} from '../utils/MarkerClusterer.js'

let gmarkers = [];

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
    let renderMarkers = this.props.renderMarkers;
    let handleClick = this.props.handleClickSurveys;
    dataset.map( (data) => {
      if (data.total_samples >=1) {        
        // if boundaries exist...
        this.renderBoundaries(google, data, handleClick)

        if (renderMarkers) {          
          if (data.core_set.length >= 1) {          
            data.core_set.map((core) => {
              this.renderMarkers(google, core)
            })
          }
          if (data.bag_set.length >=1) {
            data.bag_set.map((bag) => {
              this.renderMarkers(google, bag)
            })
          }
        }
      }
    });
    console.log(gmarkers);
    this.clusterMarkers(google)
  }

  // http://htmlpreview.github.io/?https://raw.githubusercontent.com/mahnunchik/markerclustererplus/master/docs/reference.html
  clusterMarkers(google){
    let map = google.map;
    let googleMaps = google.maps;
    // console.log(gmarkers);
    let options={
      maxZoom: 7.5,
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      averageCenter: true,
      // zoomOnClick: false
    }
    let markerCluster = new MarkerClusterer(map, gmarkers, options)
    
  }

  renderMarkers(google, data) {
    let myLatLng = new google.maps.LatLng(data.lat, data.lng);
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: google.map,
      title: data.sample_no,
      zIndex: 999999 
    });
    marker.addListener('click', function() {
      // marker.map.setZoom(8);
      marker.map.setCenter(marker.getPosition());
      console.log(marker.title);
    }); 
    gmarkers.push(marker);   
  }

  // https://github.com/mgomes/ConvexHull
  renderBoundaries(google, data, handleClick) {
    let points = [];
    let hullPoints = [];
    let hullPoints_size;

    data.core_set.map((place) => (      
      points.push(new google.maps.LatLng(place.lat, place.lng))
    ))

    data.bag_set.map((place) => (
      points.push(new google.maps.LatLng(place.lat, place.lng))
    ))
    // Sort the points by X, then by Y (required by the algorithm)
    points.sort(sortPointY);
    points.sort(sortPointX);

    // Returns: The number of hull points, which may differ the the hull points array’s size
    hullPoints_size = chainHull_2D(points, points.length, hullPoints); 
    
    let polyline = new google.maps.Polygon({
      map: google.map,
      title: data.survey_no,
      paths:hullPoints, 
      fillColor:"#FF0000",
      strokeWidth:2, 
      fillOpacity:0.5, 
      strokeColor:"#0000FF",
      strokeOpacity:0.5,
    });
    polyline.addListener('click', function(e) {
      // marker.map.setZoom(8)
      console.log(e)
      console.log(this)
      console.log(polyline.title);
      // Feed survey id to handle click so handleClick can
      // trigger the collapse of collapseSurveyDetails:id
      handleClick(data.id);
    });     
  }

  componentWillUnmount(){
    gmarkers=[]
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
