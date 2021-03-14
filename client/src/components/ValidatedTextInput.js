import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

const ValidatedTextInput = ({ error, value, label, onChangeText, style, tabIndex }) => (
  <TextField
    style={style}
    value={value}
    error={error && error.length > 0}
    variant="outlined"
    label={label}
    onChange={onChangeText}
    helperText={error ? error : ""}
    tabIndex={tabIndex}
  />
);

ValidatedTextInput.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

export default ValidatedTextInput;
