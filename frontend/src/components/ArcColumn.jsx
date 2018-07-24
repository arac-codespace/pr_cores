import * as React from 'react';
import { loadModules } from 'react-arcgis';

class ArcColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphic: null
        };
    }

    componentWillMount() {
        loadModules(['esri/Graphic']).then(([ Graphic ]) => {
            // Create a polygon geometry
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                  [-64.78, 32.3],
                  [-66.07, 18.45],
                  [-80.21, 25.78],
                  [-64.78, 32.3]
                ]
            };

            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "polygon-3d", // autocasts as new SimpleFillSymbol()
                symbolLayers: [{
                  type: "extrude",  // autocasts as new ExtrudeSymbol3DLayer()
                  size: 10000,    // Height of the extrusion in meters
                  material: { color: "blue" }
                }]                
            };

            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                // geometry: polygon,
                symbol: fillSymbol
            });

            this.setState({ graphic });
            this.props.view.graphics.add(graphic);

        });
    }

    componentWillUnmount() {
        this.props.view.graphics.remove(this.state.graphic);
    }

    render() {
        return null;
    }

}

export default ArcColumn;