import React, { Component } from 'react';
import bbox from 'turf-bbox';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';

const ChoroplethColors = [ '#045a8d', '#2b8cbe', '#74a9cf', '#bdc9e1', '#f1eef6' ];
// const Breakpoints = [ 30, 20, 15, 10, 0 ];
const Breakpoints = window.breakpoints;

function getColor(percent) {
    return percent > Breakpoints[0] ? ChoroplethColors[0] :
        percent > Breakpoints[1] ? ChoroplethColors[1] :
        percent > Breakpoints[2] ? ChoroplethColors[2] :
        percent > Breakpoints[3] ? ChoroplethColors[3] :
            ChoroplethColors[4];
}

function getLegendText(index) {
    if (index == 0) {
        return Breakpoints[index] + '% +';
    } else {
        return Breakpoints[index] + '% -' + Breakpoints[index-1] + '%';
    }
}

class EdiMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geojson: window.geojson,
            label: props.data.label
        };
        const bounds = bbox(window.geojson);
        const corner1 = [bounds[1], bounds[0]];
        const corner2 = [bounds[3], bounds[2]];
        this.state.bounds = [corner1, corner2];
        this.buildLegend = this.buildLegend.bind(this); 
        this.updateGeoJSON = this.updateGeoJSON.bind(this);
        this.zoomHome = this.zoomHome.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
    }

    componentWillReceiveProps(oldProps, newProps) {
        this.leafletMap.leafletElement.closePopup();
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

    updateGeoJSON(features, data) {
        const label = this.props.data.label;
        const newFeatures = features.map((f) => {
            const tract = f.properties.NAMELSAD10;
            const fips = f.properties.GEOID10;
            const ediData = data.data[fips]; 
            const popupLabel = '<div style="font-weight:bold">Percent of children who score in lowest 10%</div><div>' + tract + '</div><div>' + label + ': ' + '<b>'+ Math.round(ediData.percent * 100)/100 + '%' + '</b></div>';
            f.properties['EDI'] = ediData;
            f.properties['label'] = popupLabel;
            return f;
        });
        return newFeatures;
    }


    onEachFeature(feature, layer) { 
        layer.on({
            click: function(event) { 
                const label = event.target.feature.properties.label;
                const popup = L.popup()
                .setLatLng(event.latlng)
                .setContent(label)
                .openOn(layer._map);
            }
        });
    }

    zoomHome() {
        const bounds = this.state.bounds;
        const leafletMap = this.refs.map.leafletElement;
        leafletMap.fitBounds(bounds); 
    }

    buildLegend() {
        let labels = [];
        Breakpoints.forEach((b, index) => {
            const color = getColor(b+1);
            const text = getLegendText(index);
            labels.push(
            <div>
                <span>
                    <svg width='20px' height='20px' xmlns='https://www.w3.org/2000/svg'>
                        <rect x='0' y='0' width='20' height='20' style={{fill:color}}/>
                    </svg>
                </span>
                <span style={{paddingLeft:'5px', verticalAlign:'top'}}>{text}</span>
            </div>);
        });
        return (
            <Control position='bottomright'><div style={{backgroundColor:'lightgrey', padding:'5px 10px'}}><p>% Vulnerable</p>{labels}</div></Control>
        );
    }


    render () {
        const geojson = this.state.geojson; 
        geojson.features = this.updateGeoJSON(geojson.features, this.props.data);
        return ( 
            <div>
                <h2>Maps</h2>
                <Map bounds={this.state.bounds} ref="map">
                <TileLayer
                    url='https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
                    attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                    />
                    <GeoJSON ref="geojson" data={geojson} style={this.style} onEachFeature={this.onEachFeature}/>) 
                    {this.buildLegend()}
                    <Control position='topleft'>
                        <div className='leaflet-control-home leaflet-bar'>
                        <a className='leaflet-touch' href='#' role='button' aria-label='Zoom home' title='Zoom home' onClick={this.zoomHome}>
                            <i className='fa fa-home'/>
                        </a>
                        </div>
                    </Control>
                </Map>
            </div>
        );
    }
}

export default EdiMap;
