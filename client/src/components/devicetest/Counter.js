import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

/**
 *
 * @param {object} props
 * @param {number} props.expectedValue
 * @param {number} props.value The value to be displayed, will be greener when closer to expected value, and redder when far away.
 */
const Counter = ({ expectedValue, value }) => {
  const difference = Math.abs(value - expectedValue);
  const exaggeratedDifference = (difference / expectedValue) * 8;
  const fontColor = `rgb(${exaggeratedDifference * 255},${255 -
    exaggeratedDifference * 255},0)`;

  return (
    <div style={{ alignItems: "center", textAlign: "center" }}>
      <div
        style={{
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 3,
          borderRadius: 5,
          width: "100%",
          overflow: "hidden"
        }}
      >
        <Typography
          style={{ backgroundColor: "black", color: fontColor, padding: 10 }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
};

Counter.propTypes = {
  expectedValue: PropTypes.number,
  value: PropTypes.number
};

export default Counter;
