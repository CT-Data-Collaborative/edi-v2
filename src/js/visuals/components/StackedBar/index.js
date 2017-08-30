import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Panel } from 'react-bootstrap';

const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

class StackedBarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open : this.props.open,
      colors : window.chartColors
    }
  }

  render () {

    const columns = this.props.columns.map((c) => c.label);
    const colorLookup = {};
    this.props.columns.forEach((c,i) => {
      colorLookup[c.label] = this.state.colors[i]
    });
    const data = this.props.data.map((row) => {
      const newRow = {};
      newRow[this.props.dataKey] = row[this.props.dataKey];
      columns.forEach((c) => {
        newRow[c] = row[c].percent;
      });
      return newRow
    });
    const icon = this.state.open ? "fa fa-minus" : "fa fa-plus";
    const buttonText = this.state.open ? "Hide Chart" : "View Chart";
    return (
      <div>
        <hr/>
        <h5>{this.props.chartTitle}</h5> 
        <p>{this.props.intro}</p>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}><i className={icon}></i> { buttonText }</Button> 
        { this.state.open == true &&
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
              return <Bar maxBarSize={150} dataKey={c} stackId="a" fill={colorLookup[c]}/>
            })}
          </BarChart>
          </ResponsiveContainer>
        }
      </div>
    )
  }
}

export default StackedBarChart;
