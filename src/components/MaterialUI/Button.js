import React from "react";

import MUIButton from "@material-ui/core/Button";

const Button = (props) => {
  return (
    <span className="u-mar--2 u-align-items--center u-justify-content--center">
      <MUIButton variant="contained" color="secondary" {...props}>
        {props.label || props.children}
      </MUIButton>
    </span>
  );
};

export default Button;
