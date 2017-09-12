import React, { Component } from 'react';
import StackedBarChart from './components/StackedBar';
import EdiMap from './components/Maps';
import Select from 'react-select';

class App extends Component {
  constructor(props) {
    super(props);
    const mainElement = document.getElementById('main');
    this.state = {
      mapData: window.data.domain_map_data,
      vulData: window.data.vulnerable_map_data,
      chartData: window.data.chart_data,
      domainColors: window.domainColorScale,
      vulColors: window.vulnerableColorScale,
      selectedMapData: 'language',
      selectedVulMapData: 'vulnerable_one',
      city: window.city,
      height: mainElement.clientHeight,
      width: mainElement.clientWidth
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

    const mapWidth = this.state.width > 850 ? '800px' : this.state.width*.9 + 'px';
    return (
      <div style={{paddingTop: '20px'}}>
        <h1>Visualize the results for {this.state.city}</h1>
        <p>The Early Development Instrument (EDI) looks at five domains that cover the academic, social, physical, and emotional development children need to thrive and be ready for school:</p>
        <ul>
        	<li>Physical Health & Well-being</li>
        	<li>Social Competence</li>
        	<li>Emotional Maturity</li>
        	<li>Language & Cognitive Development</li>
        	<li>Communication Skills & General Knowledge</li>
        </ul>
        <p>Explore results in the following <a href="#maps">maps</a> and <a href="#charts">charts</a>.</p>
        <h4 id="maps">Maps</h4>
        <p>The following maps display the results for each neighborhood (census tract). The first map displays the results by domains. Use the dropdown menu to change which domain is displayed. Click on a neighborhood to see the displayed values. The second map displays the results by the % of children vulnerable on one domain or vulnerable on one or more domains. A student is considered vulnerable if their score is in the lowest 10th percentile of results.</p>
        <h5>Select Neighborhood EDI Results by Domain</h5>
        <Select
           name="map-data-select"
           value={selectedMapData}
           options={dropdownChoices}
           onChange={this.updateSelected}
           style={{width: mapWidth}}
         />
        <EdiMap geojson={window.geojson} data={mapData} colors={this.state.domainColors} width={mapWidth}/>
        <hr style={{width: mapWidth, textAlign: "left", marginLeft: 0}}/>
        <h5>View Neighborhoods Where Kids are Vulnerable</h5>
        <Select
           name="vul-map-data-select"
           value={selectedVulMap}
           options={vulDropdownChoices}
           onChange={this.updateVulSelected}
           style={{width: mapWidth}}
         />
        <EdiMap geojson={window.geojson} data={vulData} colors={this.state.vulColors} width={mapWidth}/>
        <hr/>
        <h4 id="charts">Charts</h4>
        <StackedBarChart
          chartTitle="Who is considered vulnerable?"
          data={this.state.chartData.vulnerable.data}
          columns={this.state.chartData.vulnerable.columns}
          open={true}
          dataKey="geography"
          width={this.state.width}
        />
        <StackedBarChart
          chartTitle={this.state.chartData.physical.label}
          intro={this.state.chartData.physical.intro}
          data={this.state.chartData.physical.components}
          columns={this.state.chartData.physical.columns}
          open={false}
          dataKey="component"
          width={this.state.width}
        />
        <StackedBarChart
          chartTitle={this.state.chartData.emotional.label}
          intro={this.state.chartData.emotional.intro}
          data={this.state.chartData.emotional.components}
          columns={this.state.chartData.emotional.columns}
          open={false}
          dataKey="component"
          width={this.state.width}
        />
        <StackedBarChart
          chartTitle={this.state.chartData.social.label}
          intro={this.state.chartData.social.intro}
          data={this.state.chartData.social.components}
          columns={this.state.chartData.social.columns}
          open={false}
          dataKey="component"
          width={this.state.width}
        />
        <StackedBarChart
          chartTitle={this.state.chartData.language.label}
          intro={this.state.chartData.language.intro}
          data={this.state.chartData.language.components}
          columns={this.state.chartData.language.columns}
          open={false}
          dataKey="component"
          width={this.state.width}
        />
        <StackedBarChart
          chartTitle={this.state.chartData.communication.label}
          intro={this.state.chartData.communication.intro}
          data={this.state.chartData.communication.components}
          columns={this.state.chartData.communication.columns}
          open={false}
          dataKey="component"
          width={this.state.width}
        />
      </div>
    );
  }
}

export default App;
