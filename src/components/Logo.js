import React from "react";

class Logo extends React.Component {
  render() {
    return (
      <svg
        x="0px"
        y="0px"
        viewBox="0 0 600 1600"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="200"
        strokeMiterlimit="10"
      >
        <path d="M200,300c0,55.2,44.8,100,100,100s100-44.8,100-100V100" />
        <path d="M100,1200h200c55.2,0,100,44.8,100,100s-44.8,100-100,100H100" />
        <polyline points="100,700 299.5,700.5 300,1000 " />
        <polyline points="300,700 400,700 500,700 " />
      </svg>
    );
  }
}

export default Logo;
