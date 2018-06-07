import React from "react";

const CoarseForamOoze = props => (
    <defs>
      <pattern
        id={props.id}
        width={props.width}
        height={props.height}
        patternUnits="userSpaceOnUse"
      >
        <g
          id="e3_group"
          transform={"matrix(2 0 0 2 15 15) " + props.scale}
          fill="transparent"
          stroke="#000"
        >
          <path
            d="M-2-4l-2 4 2 4h4l2-4-2-4z"
            id="e3_shape"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M5.943-4.057l-2 4 2 4h4l2-4-2-4z"
            id="e4_shape"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M2.229 4.114l-2 4 2 4h4l2-4-2-4z"
            id="e5_shape"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </pattern>
    </defs>
);

export default CoarseForamOoze;
