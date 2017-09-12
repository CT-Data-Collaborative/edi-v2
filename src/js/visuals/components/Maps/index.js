import React, { Component } from 'react';
import bbox from 'turf-bbox';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';

class EdiMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geojson: JSON.parse(JSON.stringify(this.props.geojson)),
            label: props.data.label,
            colors: props.colors,
            breakpoints: window.breakpoints
        };
        const bounds = bbox(window.geojson);
        const corner1 = [bounds[1], bounds[0]];
        const corner2 = [bounds[3], bounds[2]];
        this.state.bounds = [corner1, corner2];
        this.buildLegend = this.buildLegend.bind(this);
        this.updateGeoJSON = this.updateGeoJSON.bind(this);
        this.zoomHome = this.zoomHome.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        this.getColor = this.getColor.bind(this);
        this.style = this.style.bind(this);
        this.getLegendText = this.getLegendText.bind(this);
    }

    componentWillReceiveProps(oldProps, newProps) {
        this.refs.map.leafletElement.closePopup();
    }


    getColor(percent) {
        const ChoroplethColors = this.state.colors;
        const Breakpoints = this.state.breakpoints;
        return percent > Breakpoints[0] ? ChoroplethColors[0] :
            percent > Breakpoints[1] ? ChoroplethColors[1] :
            percent > Breakpoints[2] ? ChoroplethColors[2] :
            percent > Breakpoints[3] ? ChoroplethColors[3] :
                ChoroplethColors[4];
    }

    getLegendText(index) {
        const Breakpoints = this.state.breakpoints;
        if (index == 0) {
            return Breakpoints[index] + '% +';
        } else {
            return Breakpoints[index] + '% -' + Breakpoints[index-1] + '%';
        }
    }

    style(feature) {
        return {
            fill: true,
            fillColor: this.getColor(feature.properties.EDI.percent),
            fillOpacity: .8,
            weight: 2,
            opacity: 1,
            color: '#E8E8E8',
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
        const Breakpoints = this.state.breakpoints;
        Breakpoints.forEach((b, index) => {
            const color = this.getColor(b+1);
            const text = this.getLegendText(index);
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
                <Map style={{width: this.props.width, height:"500px"}} bounds={this.state.bounds} ref="map">
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
