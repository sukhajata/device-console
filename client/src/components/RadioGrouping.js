import React from "react";
import PropTypes from "prop-types";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/fields";

const RadioGrouping = ({
  selected,
  onValueChange,
  options,
  direction,
  errorMessage
}) => (
  <>
    <RadioGroup
      value={selected}
      onChange={onValueChange}
      row={direction === "row"}
    >
      {options.map(option => (
        <FormControlLabel
          key={option.value}
          value={option.value.toString()}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
    {errorMessage && (
      <Typography style={styles.errorText}>{errorMessage}</Typography>
    )}
  </>
);

RadioGrouping.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  direction: PropTypes.string
};

RadioGroup.defaultProps = {
  direction: "column"
};

export default RadioGrouping;
