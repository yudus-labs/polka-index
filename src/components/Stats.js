import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Stats.css";

export default function StatsSection(props) {
  return (
    <div className="container-fluid stats-section">
      <div className="ksm-dot-rate">
        {" "}
        <b>KSM/DOT</b> rate :{" "}
        <b>{(props.prices.ksm / props.prices.dot).toFixed(2)}</b>
      </div>
    </div>
  );
}
StatsSection.propTypes = {
  prices: PropTypes.object,
};
