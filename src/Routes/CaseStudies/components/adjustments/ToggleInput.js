import React from "react";
import PropTypes from "prop-types";

class ToggleInput extends React.Component {
  render() {
    const { handleChange, propertyName, type } = this.props;

    return (
      <div className="adjustments-input adjustments-input--toggle-button">
        <button
          type={type}
          onClick={() => handleChange(this.props.valueFromProps)}
        >
          {propertyName}
        </button>
      </div>
    );
  }
}

ToggleInput.propTypes = {
  propertyName: PropTypes.string.isRequired
};

export default ToggleInput;
