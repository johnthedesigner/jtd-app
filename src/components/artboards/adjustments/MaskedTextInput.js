import React from "react";
import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';

class MaskedTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({
      value: this.props.valueFromProps
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.valueFromProps
    });
  }

  handleChange(event) {
    var newValue = event.target.value;
    if (this.props.type === "number") {
      newValue = event.target.value;
    } else {
      newValue = event.target.value;
    }

    this.setState({
      value: newValue
    });
  }

  handleFocus(event) {
    event.target.select();
  }

  handleBlur(event) {
    this.props.setValue(this.state.value);
  }

  handleKeyPress(event) {
    console.log(event.target);
    switch (event.key) {
      case "Enter":
        event.target.blur();
        break;
      case "ArrowUp":
        this.props.setValue(this.state.value + (event.shiftKey ? 10 : 1));
        break;
      case "ArrowDown":
        this.props.setValue(this.state.value - (event.shiftKey ? 10 : 1));
        break;
      default:
        return true;
    }
  }

  render() {
    const { propertyName, label, tooltipText } = this.props;

    const labelStyles = {
      display: label ? "block" : "none"
    };

    return (
      <div className="adjustments-input adjustments-input--text">
        <label
          htmlFor={"dimensions-adjustment__" + propertyName}
          style={labelStyles}
        >
          {label}
        </label>
        <Tooltip title={tooltipText} placement="right">
          <input
            type={"text"}
            value={this.state.value}
            placeholder={"-"}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyPress}
            onFocus={this.handleFocus}
          />
        </Tooltip>
      </div>
    );
  }
}

MaskedTextInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default MaskedTextInput;
