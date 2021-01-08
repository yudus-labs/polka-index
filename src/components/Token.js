import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Token.css";

const RAW_GITHUB_LOGO_DIR_URL =
  "https://raw.githubusercontent.com/yudus-labs/polka-index/main/public/resource/token_logos";

// ############################################################################
// TokenItemDetails

function TokenItemDetails(props) {
  const cap = props.details.cap ? props.details.cap.toLocaleString() : "N/A";
  const dilutedCap = props.details.diluted_cap
    ? props.details.diluted_cap.toLocaleString()
    : "N/A";
  const supply = props.details.supply
    ? parseFloat(props.details.supply.toFixed()).toLocaleString()
    : "N/A";
  const totalSupply = props.details.total_supply
    ? parseFloat(props.details.total_supply.toFixed()).toLocaleString()
    : "N/A";
  const maxSupply = props.details.max_supply
    ? parseFloat(props.details.max_supply.toFixed()).toLocaleString()
    : "N/A";

  if (props.details.supply && props.details.total_supply) {
    var supplyCompare = ` ( ${(
      (props.details.supply / props.details.total_supply) *
      100
    ).toFixed(2)}% of total supply )`;
  } else {
    supplyCompare = "";
  }

  return props.detailsOn ? (
    <div className="token-item-details">
      <div className="row">
        <div className="col">
          <b className="token-item-details-emphasis">
            Market cap : {cap}
            <br />
            Fully diluted cap : {dilutedCap}
            <br />
            <br />
            Circulating supply : {supply}
            {supplyCompare}
            <br />
            Total supply : {totalSupply}
            <br />
            Max supply : {maxSupply}
          </b>
          <br />
          <br />
          <b className="token-item-details-emphasis">Homepage</b> :{" "}
          {props.details.homepage ? (
            <a href={props.details.homepage} className="custom-link">
              {props.details.homepage}
            </a>
          ) : (
            "N/A"
          )}
          <br />
          <br />
          <b className="token-item-details-emphasis">Description</b>
          <br />
          <br />
          {props.details.desc ? props.details.desc : "N/A"}
          <br />
          <br />
          <b className="token-item-details-emphasis">Useful links</b>
          <br />
          <br />
          {props.details.links.map((link, i) => (
            <div key={i}>
              {" "}
              <a href={link} className="custom-link">
                {link}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
TokenItemDetails.propTypes = {
  details: PropTypes.object,
  detailsOn: PropTypes.bool,
};

// ############################################################################
// TokenItemMain

function MainGrpA(props) {
  const logo = props.token.logo.startsWith("http")
    ? props.token.logo
    : `${RAW_GITHUB_LOGO_DIR_URL}/${props.token.logo}.png`;

  function Logo() {
    return (
      <div className="main-grp-logo">
        <img src={logo} alt="" width="40" height="40" />
      </div>
    );
  }
  function Price() {
    const price =
      props.token.price >= 1
        ? props.token.price.toFixed(2)
        : props.token.price.toFixed(3);
    return (
      <div className="main-grp-price" style={{ marginLeft: "-10px" }}>
        $<b>{price}</b>
      </div>
    );
  }
  function PriceChange() {
    const delta = props.token.price_change_24h;
    return (
      <div
        className={
          delta >= 0 ? "main-grp-price-change-up" : "main-grp-price-change-down"
        }
        style={{ marginLeft: "0px" }}
      >
        <b>{delta.toFixed(2)}</b>%
      </div>
    );
  }
  function Name() {
    return <div className="main-grp-name">{props.token.name}</div>;
  }
  function Symbol() {
    return (
      <div className="main-grp-symbol">{props.token.symbol.toUpperCase()}</div>
    );
  }

  return (
    <div className="token-item-main-grp">
      <div className="row mb-3">
        <div className="col-auto pr-0">
          <Logo />
        </div>
        <div className="col-auto">
          <Name />
        </div>
      </div>

      <div className="row">
        <div className="col-auto">
          <Symbol />
        </div>
        <div className="col-auto pr-0">
          <Price />
        </div>
        <div className="col-2">
          <PriceChange />
        </div>
      </div>
    </div>
  );
}

function MainGrpB(props) {
  const cap = props.token.details.cap;
  let niceCap = "";
  if (cap >= 1000000000) {
    niceCap = (cap / 1000000000).toFixed(3) + " B";
  } else if (cap >= 1000000) {
    niceCap = (cap / 1000000).toFixed(3) + " M";
  } else {
    niceCap = cap.toLocaleString();
  }

  function Cap() {
    return (
      <div className="main-grp-cap">
        <div className="main-grp-cap-number">
          $ <span style={{ textShadow: "0.5px 0.5px 0.5px" }}>{niceCap}</span>
        </div>
        <div className="main-grp-cap-label">Market Cap</div>
      </div>
    );
  }
  function Rank() {
    return (
      <div className="main-grp-rank">
        <div className="main-grp-rank-number"># {props.token.rank}</div>
        <div className="main-grp-rank-label">Rank</div>
      </div>
    );
  }
  function AllTime() {
    const atl = props.token.atl.toFixed(2);
    const ath = props.token.ath.toFixed(2);
    const sinceATH = ath > 0 ? ((ath - props.token.price) / ath) * 100 : 0;
    const sinceATL = atl > 0 ? ((props.token.price - atl) / atl) * 100 : 0;

    return (
      <div className="main-grp-all-time">
        <div className="main-grp-since-atl">
          <b className="main-grp-since-atl-number">{sinceATL.toFixed(2)}</b>%
          since $<b>{atl}</b> ATL
        </div>
        <div className="main-grp-since-ath">
          <b className="main-grp-since-ath-number">-{sinceATH.toFixed(2)}</b>%
          since $<b>{ath}</b> ATH
        </div>
      </div>
    );
  }

  return (
    <div className="token-item-main-grp" style={{ marginLeft: "0px" }}>
      <div className="row">
        <div className="col-auto pr-0">
          <Cap />
        </div>
        <div className="col-auto">
          <Rank />
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <AllTime />
        </div>
      </div>
    </div>
  );
}

function MainGrpC(props) {
  const tags = props.token.tags;

  function Tags() {
    return (
      <div className="row main-grp-tags">
        {tags.map((t, i) => (
          <div className="col-auto pr-0" key={i}>
            <div className="main-grp-tag-item">{props.tagMap[t]}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="token-item-main-grp" style={{ marginLeft: "0px" }}>
      <div className="row">
        <div className="col">
          <Tags />
        </div>
      </div>
    </div>
  );
}

function MainGrpD(props) {
  function W3F() {
    return (
      <div className="main-grp-w3f">{props.token.w3f ? "W3F Grant ✓" : ""}</div>
    );
  }
  function DetailBtn() {
    return (
      <div
        type="button"
        className={`btn btn-primary btn-block main-grp-detail-btn-${
          props.detailsOn ? "off" : "on"
        }`}
        onClick={(e) => {
          props.toggleDetails();
        }}
      >
        {props.detailsOn ? "Details ▼" : "Details ▶"}
      </div>
    );
  }

  return (
    <div className="token-item-main-grp" style={{ marginLeft: "0px" }}>
      <div className="row">
        <div className="col-auto pr-0">
          <W3F />
        </div>
        <div className="col-auto ">
          <DetailBtn />
        </div>
      </div>
    </div>
  );
}

function TokenItemMain(props) {
  return (
    <div className="token-item-main">
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4">
          <MainGrpA token={props.token} />
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4">
          <MainGrpB token={props.token} />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-4">
          <MainGrpC token={props.token} tagMap={props.tagMap} />
        </div>
        <div className="col-lg-2 col-md-2 col-sm-4">
          <MainGrpD
            token={props.token}
            toggleDetails={props.toggleDetails}
            detailsOn={props.detailsOn}
          />
        </div>
      </div>
    </div>
  );
}
TokenItemMain.propTypes = {
  token: PropTypes.object,
  tagMap: PropTypes.object,
  toggleDetails: PropTypes.func,
  detailsOn: PropTypes.bool,
};

// ############################################################################
// TokenItem

function TokenItem(props) {
  const [state, setState] = useState({
    detailsOn: false,
  });

  const toggleDetails = () => {
    setState((s) => ({
      detailsOn: !s.detailsOn,
    }));
  };

  let isFilteredOut = false;

  // Listed on exchange filter
  if (props.filter.listed) {
    if (!props.token.cg_id) {
      isFilteredOut = true;
    }
  } else {
    if (props.token.cg_id) {
      isFilteredOut = true;
    }
  }

  // Tags filter
  if (props.token.tags) {
    const tmp = props.token.tags.filter((i) =>
      props.filter.curTags.includes(i)
    );
    if (tmp.length === 0) {
      isFilteredOut = true;
    }
  } else {
    isFilteredOut = true;
  }

  return isFilteredOut ? (
    ""
  ) : (
    <div className="token-item">
      <div className="row">
        <div className="col">
          <TokenItemMain
            token={props.token}
            tagMap={props.tagMap}
            toggleDetails={toggleDetails}
            detailsOn={state.detailsOn}
          />
          <TokenItemDetails
            details={props.token.details}
            detailsOn={state.detailsOn}
          />
        </div>
      </div>
    </div>
  );
}
TokenItem.propTypes = {
  token: PropTypes.object,
  filter: PropTypes.object,
  tagMap: PropTypes.object,
};

export default function TokenSection(props) {
  return (
    <div className="container-fluid token-section">
      {props.tokens.map((t, i) => (
        <TokenItem
          token={t}
          filter={props.filter}
          tagMap={props.tagMap}
          key={t.name + i.toString()}
        />
      ))}
    </div>
  );
}
TokenSection.propTypes = {
  tokens: PropTypes.array,
  filter: PropTypes.object,
  tagMap: PropTypes.object,
};
