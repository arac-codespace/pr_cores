import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CorePin from './CorePin';

// https://github.com/mgomes/ConvexHull
import {chainHull_2D, sortPointX, sortPointY} from '../utils/convexHull.js';
// https://github.com/googlemaps/v3-utility-library/
import {MarkerClusterer} from '../utils/MarkerClusterer.js';
import {MapLabel} from '../utils/MapLabel.js';

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
    this.renderBoundaries = this.renderBoundaries.bind(this);
  }

  handleGoogleMapApi(google){
    let dataset = this.props.dataset;
    let renderMarkers = this.props.renderMarkers;
    let handleClick = this.props.handleClick;
    console.log(dataset);

    // dataset.length = array length
    if (dataset.length) {
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
    } else {
      // dataset is a single object, so we're in survey/:id
     if (dataset.total_samples >=1) {        
        // if boundaries exist...
        this.renderBoundaries(google, dataset, handleClick)

        if (renderMarkers) {          
          if (dataset.core_set.length >= 1) {          
            dataset.core_set.map((core) => {
              // google, data, listenMarker
              this.renderMarkers(google, core, true)
            })
          }
          if (dataset.bag_set.length >=1) {
            dataset.bag_set.map((bag) => {
              // google, data, listenMarker
              this.renderMarkers(google, bag, true)
            })
          }
        }
      }
    }

    this.clusterMarkers(google)
  }

  // http://htmlpreview.github.io/?https://raw.githubusercontent.com/mahnunchik/markerclustererplus/master/docs/reference.html
  clusterMarkers(google){
    let map = google.map;
    let googleMaps = google.maps;
    // console.log(gmarkers);
    let options={
      maxZoom: 8,
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      averageCenter: true,
      // zoomOnClick: false
    }
    let markerCluster = new MarkerClusterer(map, gmarkers, options)
    
  };

  renderMarkers(google, data, listenMarker = false) {
    let myLatLng = new google.maps.LatLng(data.lat, data.lng);
    let handleClick = this.props.handleClick;
    let symbol = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      // data.total_length is a core attribute
      fillColor: data.total_length ? "blue" : "green",
      fillOpacity: 1,
      strokeColor: data.total_length ? "red" : "yellow",
      strokeWeight: 5,
      labelOrigin: new google.maps.Point(0, -2),
    };

    let marker = new google.maps.Marker({
      position: myLatLng,
      map: google.map,
      title: data.total_length ? "Core: " + data.sample_no : "Bagged: " + data.sample_no,
      zIndex: 999999,
      icon: symbol,
      label: {
        text: data.sample_no,
        fontWeight: "bold",
      },
      clickable: true,
      cursor: "help"
    });

    let handleClickPackage = {
      // check target data type
      isSurvey: false,
      isCore: data.total_length ? true : false,
      id: data.id,
      name: data.sample_no
    }

    marker.addListener('click', function() {
      // marker.map.setZoom(8);
      marker.map.setCenter(marker.getPosition());
      if (listenMarker){
        handleClick(handleClickPackage);
      }
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
    
    let polygon = new google.maps.Polygon({
      map: google.map,
      paths:hullPoints, 
      fillColor:"#FF0000",
      strokeWidth: 2, 
      fillOpacity:0.5, 
      strokeColor:"#0000FF",
      strokeOpacity:0.5,
    });

    let handleClickPackage = {
      // check target data type
      isSurvey: true,
      id: data.id,
      name: data.survey_no
    }

    polygon.addListener('click', function(e) {
      // Feed survey id to handle click so handleClick can
      // trigger the collapse of collapseSurveyDetails:id
      handleClick(handleClickPackage);
    });

    let bounds = new google.maps.LatLngBounds();
    
    polygon.getPath().forEach(function(path,index){
      bounds.extend(path);
    });

    let polygonCenter = bounds.getCenter();

    let opt_options = {
      text: data.survey_no,
      position: polygonCenter,
      map: google.map,
      fontSize: 16,
      strokeWeight: 4,
      align: 'right',
      strokeColor: 'white',
      fontWeight: 'bold',
      fontColor: 'red',
    }

    let mapLabel = new MapLabel(opt_options);    
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
