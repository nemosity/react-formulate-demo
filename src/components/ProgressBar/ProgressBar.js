import PropTypes from "prop-types";
import React from "react";

import "./ProgressBar.scss";

const ProgressBar = ({ currentStep, initialPercentage, totalSteps }) => {
  const progress = Math.max(
    initialPercentage,
    Math.min((currentStep / (totalSteps - 1)) * 100, 100)
  );

  return (
    <div className="ProgressBar">
      <div className="ProgressBar--bar">
        <div style={{ width: progress + "%" }} />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number,
  initialPercentage: PropTypes.number,
  totalSteps: PropTypes.number.isRequired,
};

ProgressBar.defaultProps = {
  currentStep: 0,
  initialPercentage: 0,
};

export default ProgressBar;
