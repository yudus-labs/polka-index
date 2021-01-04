import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Head.css";

export default function HeadSection() {
  return (
    <div className="container-fluid head-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col head-section-title">Polka Index</div>
        </div>
        <div className="row justify-content-center">
          <div className="col head-section-line" />
        </div>
        <div className="row justify-content-center">
          <div className="col head-section-about">
            For Polkadot Warriors - v0.1.0
            <br />© 2021 Yudus Labs
            <br />
            Data provided by CoinGecko
          </div>
        </div>
      </div>
    </div>
  );
}
