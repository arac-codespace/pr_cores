import React from 'react'
import Axis from './Axis'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    // I'm rendering the axes at a different location so...
    // translate: `translate(0, ${height - margins.bottom})`,    
    translate: 'translate(0,' + (height - margins.bottom - margins.top) + ')',
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    // translate: `translate(${margins.left}, 0)`,
    translate: 'translate(0,0)',
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}