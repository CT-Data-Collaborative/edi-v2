import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button, Panel } from 'react-bootstrap';


const toPercent = (decimal, fixed = 0) => {
	return `${(decimal * 100).toFixed(fixed)}%`;
};

const valToPercent = (decimal) => {
	return `${decimal.toFixed(1)}%`;
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
    const maxBarWidth = this.props.width < 1100 ? 125: 75;
    const marginLeft = this.props.width < 1100 ? 100 : 50;

    // this is kind of horrible. should move this into some sort of settings getter so it's not so messy
    let responsiveAspect = 1.6;
    if (this.props.width < 500) {
      responsiveAspect = 0.75;
    } else if (this.props.width < 800) {
      responsiveAspect = 1;
    } else if (this.props.width < 1100) {
      responsiveAspect = 1.25;
    }
    let responsiveWidth = '80%';
    if (this.props.width < 800) {
      responsiveWidth = '100%'
    }
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
    const findings = this.props.findings != undefined && this.props.findings.length > 0 ? <div className="findings"><h5>Key Findings</h5><ul>{this.props.findings.map((f) => <li>{f}</li>)}</ul></div> : false;

    return (
      <div>
        <hr/>
        <h5>{this.props.chartTitle}</h5>
        <p>{this.props.intro}</p>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}><i className={icon}></i> { buttonText }</Button>
        { this.state.open == true &&
          <div>
            <ResponsiveContainer
              aspect={responsiveAspect}
              width={responsiveWidth}
            >
            <BarChart
              data={data}
              stackOffset="expand"
              layout="vertical"
              margin={{ top: 20, right: 30, left: marginLeft, bottom: 20 }}
            >
              <Tooltip cursor={false} formatter={valToPercent}/>
              <YAxis type="category" dataKey={this.props.dataKey}/>
              <XAxis type="number" tickFormatter={toPercent}/>
              <Legend/>
              {columns.map((c) => {
                return <Bar maxBarSize={maxBarWidth} dataKey={c} stackId="a" fill={colorLookup[c]}/>
              })}
            </BarChart>
            </ResponsiveContainer>
            {findings}
          </div>
        }

      </div>
    )
  }
}

export default StackedBarChart;
