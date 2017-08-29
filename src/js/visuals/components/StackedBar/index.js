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
      open : this.props.open
    }
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
    const icon = this.state.open ? "fa fa-minus" : "fa fa-plus";
    return (
      <div>
        <hr/>
        <h2>{this.props.chartTitle}</h2> 
        <p>{this.props.intro}</p>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}><i className={icon}></i></Button> 
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
