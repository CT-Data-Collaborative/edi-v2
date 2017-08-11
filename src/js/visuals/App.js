import React, { Component } from 'react';
import StackedBarChart from './components/StackedBar';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mapData: window.data.map_data,
      chartData: window.data.chart_data,
    }
  }

  render() {
    return (
      <div>
        <h1>Data and Maps</h1>
        <h2>Citywide Trends</h2>
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
