import React, { Component } from 'react';

class ArcGis extends Component {

	componentDidMount(){
		let map;
		map = new esri.Map("mapDiv", {
			center: [18.2208328, -66.5901489],
			zoom: 3,
			basemap: "streets"
		});
	}
	render() {
		return (
			<div>
				<div id="mapDiv"></div>
			</div>
		);
	}
}

export default ArcGis;
