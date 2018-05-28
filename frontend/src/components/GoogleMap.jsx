import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CorePin from './CorePin'
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    // let cores = this.props.cores;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBfcYkj8QmEw1rlgsOXeGkHoun0d0u7e8s'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <CorePin
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;
