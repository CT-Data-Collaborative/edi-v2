import React, { Component } from 'react';
import StackedBarChart from './components/StackedBar';
import EdiMap from './components/Maps';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapData: window.data.map_data,
      chartData: window.data.chart_data,
      selectedMapData: 'language'
    }
    this.updateSelected = this.updateSelected.bind(this);
  }

  updateSelected(val) {
    console.log(val)
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
        <h1>Data and Maps</h1>
        <h2>Citywide Trends</h2>
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
          dataKey="geography"/>
        <h2>Subdomain Data</h2>
        <StackedBarChart
          chartTitle={this.state.chartData.physical.label}
          data={this.state.chartData.physical.components}
          columns={this.state.chartData.physical.columns}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.emotional.label}
          data={this.state.chartData.emotional.components}
          columns={this.state.chartData.emotional.columns}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.social.label}
          data={this.state.chartData.social.components}
          columns={this.state.chartData.social.columns}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.language.label}
          data={this.state.chartData.language.components}
          columns={this.state.chartData.language.columns}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.communication.label}
          data={this.state.chartData.communication.components}
          columns={this.state.chartData.communication.columns}
          dataKey="component"/>
      </div>
    )
  }
}

export default App;
