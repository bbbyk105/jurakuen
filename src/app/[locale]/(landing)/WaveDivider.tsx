import React from "react";

const WaveDivider = () => (
  <div className="w-full h-20 -mb-px text-[#f6f5f0]">
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0,40 Q150,10 300,40 T600,40 T900,40 T1200,40 L1200,100 L0,100 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

export default WaveDivider;
