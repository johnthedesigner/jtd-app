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
      <Link to="/">
        <svg
          className="logo-svg"
          x="0px"
          y="0px"
          viewBox="0 0 600 1600"
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
              points="100,700 299.5,700.5 300,1000 "
            />
            <polyline
              ref={el => (this.svgT2 = el)}
              points="300,700 400,700 500,700 "
            />
          </g>
          <g>
            <path
              ref={el => (this.svgD = el)}
              d="M100,1200h200c55.2,0,100,44.8,100,100s-44.8,100-100,100H100"
            />
          </g>
        </svg>
      </Link>
    );
  }
}

export default Logo;
