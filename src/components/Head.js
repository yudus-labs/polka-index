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
          <div className="col head-section-about">
            <div style={{ fontSize: "12px" }}>
              Track all tokens built on <b>Substrate</b> or heavily involved in{" "}
              <b>Polkadot</b> ecosystem
            </div>
            <br />© 2021 •{" "}
            <a href="https://yudus.dev" className="custom-link">
              <b>Yudus Labs</b>
            </a>{" "}
            • v0.1.0
            <br />
            Market data by{" "}
            <a href="https://coingecko.com" className="custom-link">
              <b>CoinGecko</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
