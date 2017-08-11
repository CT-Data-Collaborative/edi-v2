import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

class StackedBarChart extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const columns = this.props.columns.map((c) => c.label);
    const colorLookup = {};
    this.props.columns.forEach((c) => {
      colorLookup[c.label] = c.color;
    });
    const data = this.props.data.map((row) => {
      const newRow = {};
      newRow[this.props.dataKey] = row[this.props.dataKey];
      columns.forEach((c) => {
        newRow[c] = row[c].percent;
      });
      return newRow
    });
    return (
      <div>
        <h2>{this.props.chartTitle}</h2>
        <ResponsiveContainer
          aspect={1.6}
          width="80%"
        >
        <BarChart
          data={data}
          stackOffset="expand"
        >
          <XAxis dataKey={this.props.dataKey}/>
          <YAxis tickFormatter={toPercent}/>
          <Legend/>
          {columns.map((c) => {
            return <Bar dataKey={c} stackId="a" fill={colorLookup[c]}/>
          })}
        </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default StackedBarChart;
