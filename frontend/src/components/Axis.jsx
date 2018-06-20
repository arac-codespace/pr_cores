import React, { Component } from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import {selectAll} from 'd3-selection'

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`
    const axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([12])
      .ticks([this.props.ticks])
      .tickFormat("")
      // .tickFormat("")

    let tickInsert = d3Select(this.axisElement)
    tickInsert.call(axis);

    if (this.props.dash){
      tickInsert.selectAll("line").each(function(d,i){
        let numOfLines = tickInsert.selectAll("line").size();
        if (i+1<numOfLines) {
          d3Select(this).style("stroke-dasharray", "5 5")
        }
      })
    }
    
  }

  render() {
    return (
      <g
        className={`Axis Axis-${this.props.orient}`}
        ref={(el) => { this.axisElement = el; }}
        transform={this.props.translate}
      />
    )
  }
}