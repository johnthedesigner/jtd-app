import React from "react";
import anime from "animejs";
import { Link } from "react-router-dom";

class Logo extends React.Component {
  componentDidMount() {
    const logoTimeline = anime.timeline();

    logoTimeline.add({
      targets: [this.svgJ, this.svgT1, this.svgT2, this.svgD],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutQuad",
      duration: 600,
      delay: function(el, i) {
        if (i === 0) {
          return 0;
        } else {
          return i * 400;
        }
      }
    });
  }

  render() {
    return (
      <svg
        className="logo-svg"
        x="0px"
        y="0px"
        viewBox="0 0 1600 600"
        fill="none"
        strokeWidth="200"
        strokeMiterlimit="10"
      >
        <g>
          <path
            ref={el => (this.svgJ = el)}
            d="M200,300c0,55.2,44.8,100,100,100s100-44.8,100-100V100"
          />
        </g>
        <g>
          <polyline
            ref={el => (this.svgT1 = el)}
            points="600,200 799.5,200.5 800,500 	"
          />
          <polyline
            ref={el => (this.svgT2 = el)}
            points="800,200 900,200 1000,200 	"
          />
        </g>
        <g>
          <path
            ref={el => (this.svgD = el)}
            d="M1100,200h200c55.2,0,100,44.8,100,100s-44.8,100-100,100h-200"
          />
        </g>
      </svg>
    );
  }
}

export default Logo;
