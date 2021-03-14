import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";

const NiceButton = ({ title, onClick, disabled }) => (
  <div style={{ textAlign: "center" }}>
    <Button
      disabled={disabled}
      onClick={onClick}
      fullWidth
      style={{ padding: 10, marginTop: 10, minWidth: 200, maxWidth: 300 }}
      variant="contained"
      color="primary"
    >
      {title}
    </Button>
  </div>
);

NiceButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

NiceButton.defaultProps = {
  disabled: false
};

export default NiceButton;
