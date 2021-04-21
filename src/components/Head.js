import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Head.css";

export default function HeadSection(props) {
  const aboutShowed = props.aboutShowed;

  return (
    <div className="container-fluid head-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col head-section-title">Polka Index</div>
        </div>

        <div className="row justify-content-center">
          <div className="col head-section-subtitle">
            © 2021 •{" "}
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
        {aboutShowed ? (
          <div className="row">
            <div className="col head-section-about">
              <div>
                <br />
                Hello <b>Para(chain)troopers</b>,
                <br />
                This tool helps to keep track of tokens built on{" "}
                <b>Substrate</b> or heavily involved in <b>Polkadot</b>{" "}
                ecosystem
                <br />
                It is a curated list with basic due diligence, so please contact
                us if you find something wrong or missing, thank you !
                <br />
                Have a nice day and see y'all on the moon :)
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
