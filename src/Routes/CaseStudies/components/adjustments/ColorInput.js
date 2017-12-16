import React from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import Overlay from "react-overlays/lib/Overlay";

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      value: ""
    };
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
  }

  componentDidMount() {
    this.setState({
      value: this.props.valueFromProps,
      portalContainer: findDOMNode(document.body),
      portalTarget: findDOMNode(this.target)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.valueFromProps
    });
  }

  handleChangeComplete(color, event) {
    const { rgb } = color;
    let newColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    this.setState({
      value: newColor
    });
    this.props.setLayerAdjustment(this.props.propertyName, this.state.value);
  }

  togglePicker() {
    this.setState({ showPicker: !this.state.showPicker });
  }

  render() {
    console.log(this.state.portalTarget);
    console.log(this.state.portalContainer);

    const { propertyName, label } = this.props;

    const thumbnailStyles = {
      background: this.state.value,
      position: "relative"
    };

    const TooltipStyle = {
      position: "absolute",
      padding: "0 5px"
    };

    const PlacementStyles = {
      left: {
        tooltip: { marginLeft: -3, padding: "0 5px" },
        arrow: {
          right: 0,
          marginTop: -5,
          borderWidth: "5px 0 5px 5px",
          borderLeftColor: "#000"
        }
      },
      right: {
        tooltip: { marginRight: 3, padding: "0 5px" },
        arrow: {
          left: 0,
          marginTop: -5,
          borderWidth: "5px 5px 5px 0",
          borderRightColor: "#000"
        }
      },
      top: {
        tooltip: { marginTop: -3, padding: "5px 0" },
        arrow: {
          bottom: 0,
          marginLeft: -5,
          borderWidth: "5px 5px 0",
          borderTopColor: "#000"
        }
      },
      bottom: {
        tooltip: { marginBottom: 3, padding: "5px 0" },
        arrow: {
          top: 0,
          marginLeft: -5,
          borderWidth: "0 5px 5px",
          borderBottomColor: "#000"
        }
      }
    };

    const Tooltip = props => {
      return (
        <div style={{ ...TooltipStyle, ...PlacementStyles.right.tooltip }}>
          {props.children}
        </div>
      );
    };

    return (
      <div>
        <label htmlFor={`color-adjustment__${propertyName}`}>{label}</label>
        <div
          className={`color-adjustment__thumbnail color-adjustment__thumbnail--${
            propertyName
          }`}
          onClick={this.togglePicker}
          ref={el => {
            this.target = el;
          }}
          style={thumbnailStyles}
        />
        <Overlay
          container={this.target}
          show={this.state.showPicker}
          onHide={() => this.setState({ showPicker: false })}
          placement="left"
          shouldUpdatePosition={true}
          target={this.state.portalTarget}
        >
          <Tooltip>
            <div className={`color-adjustment__picker-${propertyName}`}>
              <SketchPicker
                color={this.state.value}
                onChangeComplete={this.handleChangeComplete}
                triangle="top-right"
              />
            </div>
          </Tooltip>
        </Overlay>
      </div>
    );
  }
}

ColorInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default ColorInput;
