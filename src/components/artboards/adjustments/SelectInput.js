import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
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
    this.props.setValue(event.target.value);
  }

  render() {
    const { propertyName, label, options } = this.props;

    const labelStyles = {
      display: label ? "block" : "none"
    };

    return (
      <div className="adjustments-input adjustments-input--select">
        <label
          htmlFor={"dimensions-adjustment__" + propertyName}
          style={labelStyles}
        >
          {label}
        </label>
        <select value={this.state.value} onChange={this.handleChange}>
          {_.map(options, option => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

SelectInput.propTypes = {
  propertyName: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default SelectInput;
