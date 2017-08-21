import React, { Component } from 'react';
import StackedBarChart from './components/StackedBar';
import EdiMap from './components/Maps';
import Select from 'react-select';
import Measure from 'react-measure';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapData: window.data.map_data,
      chartData: window.data.chart_data,
      selectedMapData: 'language',
      city: window.city
    }
    this.updateSelected = this.updateSelected.bind(this);
  }

  updateSelected(val) {
    this.setState({'selectedMapData': val.value})
  }

  render() {
    let choices = Object.keys(this.state.mapData);
    const dropdownChoices = choices.map((c) => {
      return { value: c, label: this.state.mapData[c].label }
    });
    
    const selectedMapData = this.state.selectedMapData;
    const mapData = this.state.mapData[selectedMapData];

    return (
      <div>
        <h1>Data and Maps for {this.state.city}</h1>
        <EdiMap data={mapData}/>
        <h3>Select a map data layer</h3>
        <Select
           name="map-data-select"
           value={selectedMapData}
           options={dropdownChoices}
           onChange={this.updateSelected}
         />
        <StackedBarChart
          chartTitle="Who is considered vulnerable?"
          data={this.state.chartData.vulnerable.data}
          columns={this.state.chartData.vulnerable.columns}
          open={true}
          dataKey="geography"/>
        <StackedBarChart
          chartTitle={this.state.chartData.physical.label}
          data={this.state.chartData.physical.components}
          columns={this.state.chartData.physical.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.emotional.label}
          data={this.state.chartData.emotional.components}
          columns={this.state.chartData.emotional.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.social.label}
          data={this.state.chartData.social.components}
          columns={this.state.chartData.social.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.language.label}
          data={this.state.chartData.language.components}
          columns={this.state.chartData.language.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.communication.label}
          data={this.state.chartData.communication.components}
          columns={this.state.chartData.communication.columns}
          open={false}
          dataKey="component"/>
      </div>
    )
  }
}

export default App;
