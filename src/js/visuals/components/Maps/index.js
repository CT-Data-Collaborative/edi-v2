import React, { Component } from 'react';
import centroid from 'turf-centroid';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';

const ChoroplethColors = [ '#045a8d', '#2b8cbe', '#74a9cf', '#bdc9e1', '#f1eef6' ];
const Breakpoints = [ 25, 15, 10, 5, 0 ];

function getColor(percent) {
    return percent > Breakpoints[0] ? ChoroplethColors[0] :
        percent > Breakpoints[1] ? ChoroplethColors[1] :
        percent > Breakpoints[2] ? ChoroplethColors[2] :
        percent > Breakpoints[3] ? ChoroplethColors[3] :
            ChoroplethColors[4];
}

function getLegendText(index) {
    if (index == 0) {
        return Breakpoints[index] + "% +"
    } else {
        return Breakpoints[index] + "% -" + Breakpoints[index-1] + "%"
    }
}

function updateGeojson(features, data) {
    const newFeatures = features.map((f) => {
        const fips = f.properties.GEOID10;
        const edi_data = data.data[fips];
        f.properties['EDI'] = edi_data
        return f;
    });
    return newFeatures;
}


class EdiMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            geojson: window.geojson,
            center: centroid(geojson),
        }
        this.buildLegend = this.buildLegend.bind(this);
        this.zoomHome = this.zoomHome.bind(this);
    }

    style(feature) {
        return {
            fill: true,
            fillColor: getColor(feature.properties.EDI.percent),
            fillOpacity: .8,
            weight: 1,
            opacity: 1,
            color: 'white',
        };
       
    }

    onEachFeature() {
        pass
    }

    zoomHome() {
        const center = [this.state.center.geometry.coordinates[1], this.state.center.geometry.coordinates[0]];
        const lat = center[0];
        const lng = center[1];
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.setView(center, 13);
    }
    
    buildLegend() {
        let labels = []
        Breakpoints.forEach((b, index) => {
            const color = getColor(b+1);
            const text = getLegendText(index);
            labels.push(
            <div>
                <span><svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="20" height="20" style={{fill:color}}/>
                </svg></span>
                <span style={{paddingLeft:"5px", verticalAlign:"top"}}>{text}</span>
            </div>)
        })
        return (
            <Control position="bottomright"><div style={{backgroundColor:"lightgrey", padding:"5px 10px"}}><p>% Vulnerable</p>{labels}</div></Control>
        )
    }

    render () {
        const center = [this.state.center.geometry.coordinates[1], this.state.center.geometry.coordinates[0]]
        const geojson = this.state.geojson;
        geojson.features = updateGeojson(geojson.features, this.props.data);
        return ( 
            <div>
                <h2>Maps</h2>
                <Map center={center} zoom={13} ref={m => { this.leafletMap = m; }}>
                <TileLayer
                    url='http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                    />
                    <GeoJSON data={geojson} style={this.style}/>
                    {this.buildLegend()}
                    <Control position="topleft">
                        <div className="leaflet-control-home leaflet-bar">
                        <a className="leaflet-touch" href="#" role="button" aria-label="Zoom home" title="Zoom home" onClick={this.zoomHome}>
                            <i className="fa fa-home"/>
                        </a>
                        </div>
                    </Control>
                </Map>
            </div>
        )
    }
}

export default EdiMap;