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
          <div className="col head-section-line">••••••• ••••••• •••••••</div>
        </div>
        <div className="row justify-content-center">
          <div className="col head-section-about">
            For Polkadot Warriors - v0.1.0
            <br />© 2021{" "}
            <a href="https://yudus.dev" className="custom-link">
              Yudus Labs
            </a>
            <br />
            Market data by{" "}
            <a href="https://coingecko.com" className="custom-link">
              CoinGecko
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
