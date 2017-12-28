import React from "react";

class ActionIcon extends React.Component {
  render() {
    const { fill } = this.props;

    switch (this.props.iconType) {
      case "sendToBack":
        return (
          <svg
            fill={fill}
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7H7v2h2V7zm0 4H7v2h2v-2zm0-8c-1.11 0-2 .9-2 2h2V3zm4 12h-2v2h2v-2zm6-12v2h2c0-1.1-.9-2-2-2zm-6 0h-2v2h2V3zM9 17v-2H7c0 1.1.89 2 2 2zm10-4h2v-2h-2v2zm0-4h2V7h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zM5 7H3v12c0 1.1.89 2 2 2h12v-2H5V7zm10-2h2V3h-2v2zm0 12h2v-2h-2v2z" />
          </svg>
        );
      case "bringToFront":
        return (
          <svg fill={fill} height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z" />
          </svg>
        );
      case "fill":
        return (
          <svg fill={fill} viewBox="0 0 24 24" version="1.1">
            <path d="M 8.21875 2 L 6.78125 3.40625 L 9.5625 6.1875 L 3.8125 11.78125 L 3.78125 11.78125 C 2.628906 12.933594 2.628906 14.847656 3.78125 16 L 3.84375 16.0625 L 8.90625 21.09375 C 10.058594 22.246094 11.894531 22.324219 13 21.21875 L 18.09375 16.09375 C 19.246094 14.941406 19.246094 13.058594 18.09375 11.90625 L 16.09375 9.90625 L 11.71875 5.5 Z M 10.96875 7.59375 L 16.6875 13.3125 C 16.910156 13.535156 17.03125 13.769531 17.03125 14 L 4.90625 14 C 4.871094 13.734375 4.964844 13.472656 5.21875 13.21875 Z M 20 16 C 20 16 18 18.898438 18 20 C 18 21.101563 18.898438 22 20 22 C 21.101563 22 22 21.101563 22 20 C 22 18.898438 20 16 20 16 Z " />
          </svg>
        );
      case "textLayer":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
        );
      case "text":
        return (
          <svg fill={fill} height="24" viewBox="0 0 24 24" width="24">
            <path d="M5 4v3h5.5v12h3V7H19V4z" />
            <path d="M0 0h24v24H0V0z" fill="none" />
          </svg>
        );
      case "ellipse":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
      case "image":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        );
      case "rectangle":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          </svg>
        );
      case "resize":
        return (
          <svg fill={fill} viewBox="0 0 24 24" version="1.1">
            <path d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 5 L 4 5 L 4 4 L 5 4 L 5 2 Z M 7 2 L 7 4 L 9 4 L 9 2 Z M 11 2 L 11 4 L 13 4 L 13 2 Z M 15 2 L 15 4 L 17 4 L 17 2 Z M 19 2 L 19 4 L 20 4 L 20 5 L 22 5 L 22 4 C 22 2.898438 21.101563 2 20 2 Z M 2 7 L 2 9 L 4 9 L 4 7 Z M 20 7 L 20 9 L 22 9 L 22 7 Z M 8 8 L 8 10 L 12.59375 10 L 7.5625 15 L 2 15 L 2 20 C 2 21.101563 2.898438 22 4 22 L 9 22 L 9 16.4375 L 14 11.40625 L 14 16 L 16 16 L 16 8 Z M 2 11 L 2 13 L 4 13 L 4 11 Z M 20 11 L 20 13 L 22 13 L 22 11 Z M 20 15 L 20 17 L 22 17 L 22 15 Z M 20 19 L 20 20 L 19 20 L 19 22 L 20 22 C 21.101563 22 22 21.101563 22 20 L 22 19 Z M 11 20 L 11 22 L 13 22 L 13 20 Z M 15 20 L 15 22 L 17 22 L 17 20 Z " />
          </svg>
        );
      default:
        return null;
    }
  }
}

export default ActionIcon;
