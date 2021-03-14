import React from "react";
import PropTypes from "prop-types";

const SignalMeter = ({ strength }) => {
  function barStyle(bar) {
    return {
      borderRadius: 2,
      width: "20%",
      height: `${25 * bar}%`,
      backgroundColor: strength >= 25 * (bar - 1) + 10 ? "green" : "lightgrey"
    };
  }

  return (
    <div style={styles.containerStyle}>
      <div style={barStyle(1)} />
      <div style={barStyle(2)} />
      <div style={barStyle(3)} />
      <div style={barStyle(4)} />
    </div>
  );
};

const styles = {
  containerStyle: {
    width: 100,
    height: 100,
    padding: "5px",
    margin: "10px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderRadius: 2,
    background: "#eeeeee"
  }
};

SignalMeter.propTypes = {
  strength: PropTypes.number.isRequired
};

export default SignalMeter;
