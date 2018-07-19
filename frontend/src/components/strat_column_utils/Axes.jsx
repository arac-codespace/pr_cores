import React from 'react'
import Axis from './Axis'

export default ({ orient, scale, translateX, translateY, margins, svgDimensions, tickSize, ticks, dash,showText }) => {
  const { height, width } = svgDimensions


  /*
    For bottom: translate(0, height - margins.top - margins-bottom)
    for left: translate(0,0)
    for top: translate(0,0)
  */ 

  if (!tickSize){
    if (orient === "Top" || orient === "Bottom"){
      tickSize = height - margins.left - margins.right

    } else {
      tickSize = width - margins.left - margins.right
    }
  }


  
  const Props = {
    orient: orient,
    scale: scale,
    translate: 'translate(' + translateX + ', ' + translateY + ')',
    tickSize: tickSize,
    width: svgDimensions.width,
    height: svgDimensions.height,
    ticks: ticks ? ticks : 5,
    dash: dash ? dash: false,
    showText: showText
  }

  return (
    <g className="axis-container">
      <Axis {...Props} />
    </g>
  )
}