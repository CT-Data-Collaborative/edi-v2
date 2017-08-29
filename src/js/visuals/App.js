import React, { Component } from 'react';
import StackedBarChart from './components/StackedBar';
import EdiMap from './components/Maps';
import Select from 'react-select';
import Measure from 'react-measure';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapData: window.data.domain_map_data,
      vulData: window.data.vulnerable_map_data,
      chartData: window.data.chart_data,
      selectedMapData: 'language',
      selectedVulMapData: 'vulnerable_one',
      city: window.city
    }
    this.updateSelected = this.updateSelected.bind(this);
    this.updateVulSelected = this.updateVulSelected.bind(this);
  }

  updateSelected(val) {
    this.setState({'selectedMapData': val.value});
  }

  updateVulSelected(val) {
    this.setState({'selectedVulMapData': val.value});
  }

  render() {
    let choices = Object.keys(this.state.mapData);
    const dropdownChoices = choices.map((c) => {
      return { value: c, label: this.state.mapData[c].label }
    });
    
    let vulChoices = Object.keys(this.state.vulData);
    const vulDropdownChoices = vulChoices.map((c) => {
      return { value: c, label: this.state.vulData[c].label }
    });

    const selectedVulMap = this.state.selectedVulMapData;
    const vulData = this.state.vulData[selectedVulMap];
    
    const selectedMapData = this.state.selectedMapData;
    const mapData = this.state.mapData[selectedMapData];

    return (
      <div style={{paddingTop: '20px'}}>
        <h1>Visualize the results for {this.state.city}</h1> 
        <p>The Early Development Instrument (EDI) looks at five domains. These domains cover the academic, social, physical, and emotional development children need to thrive and be ready for school.</p>
        <h4>Maps</h4>
        <p>The following maps display the results for each neighborhood (census tract). The first map displays the results by domains. Use the dropdown menu to change which domain is displayed. Click on a neighborhood to see the displayed values. The second map displays the results by the % of children vulnerable on one domain or vulnerable on one or more domains.</p>
        <h5>Select Neighborhood EDI Results by Domain</h5>
        <Select
           name="map-data-select"
           value={selectedMapData}
           options={dropdownChoices}
           onChange={this.updateSelected}
         /> 
        <EdiMap data={mapData}/> 
        <hr/>
        <Select
           name="vul-map-data-select"
           value={selectedVulMap}
           options={vulDropdownChoices}
           onChange={this.updateVulSelected}
         /> 
        <EdiMap data={vulData}/> 
        
        <StackedBarChart
          chartTitle="Who is considered vulnerable?" 
          data={this.state.chartData.vulnerable.data}
          columns={this.state.chartData.vulnerable.columns}
          open={true}
          dataKey="geography"/>
        <StackedBarChart
          chartTitle={this.state.chartData.physical.label}
          intro={this.state.chartData.physical.intro}
          data={this.state.chartData.physical.components}
          columns={this.state.chartData.physical.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.emotional.label}
          intro={this.state.chartData.emotional.intro}
          data={this.state.chartData.emotional.components}
          columns={this.state.chartData.emotional.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.social.label}
          intro={this.state.chartData.social.intro}
          data={this.state.chartData.social.components}
          columns={this.state.chartData.social.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.language.label}
          intro={this.state.chartData.language.intro}
          data={this.state.chartData.language.components}
          columns={this.state.chartData.language.columns}
          open={false}
          dataKey="component"/>
        <StackedBarChart
          chartTitle={this.state.chartData.communication.label}
          intro={this.state.chartData.communication.intro}
          data={this.state.chartData.communication.components}
          columns={this.state.chartData.communication.columns}
          open={false}
          dataKey="component"/>
      </div>
    );
  }
}

export default App;
