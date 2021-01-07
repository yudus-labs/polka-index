import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Token.css";

// ############################################################################
// TokenItemDetails

function TokenItemDetails(props) {
  return props.detailsOn ? (
    <div className="token-item-details">
      <div className="row">
        <div className="col">
          <b>Market cap : {props.details.cap}</b>
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
  function Logo() {
    return (
      <div className="main-grp-logo">
        <img src={props.token.logo} width="40" height="40" />
      </div>
    );
  }
  function Price() {
    return (
      <div className="main-grp-price" style={{ marginLeft: "-10px" }}>
        $<b>{props.token.price.toFixed(2)}</b>
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
        style={{ marginLeft: "-15px" }}
      >
        <b>{delta.toFixed(2)}</b>%
      </div>
    );
  }
  function Name() {
    return (
      <div className="main-grp-name">
        {props.token.symbol.toUpperCase() + " •• " + props.token.name}
      </div>
    );
  }

  return (
    <div className="token-item-main-grp">
      <div className="row">
        <div className="col-3">
          <Logo />
        </div>
        <div className="col-auto">
          <Price />
        </div>
        <div className="col-2">
          <PriceChange />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Name />
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
        <div className="main-grp-cap-number">$ {niceCap}</div>
        <div className="main-grp-cap-label">Market Cap</div>
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
        <div className="col">
          <Cap />
        </div>
      </div>
      <div className="row">
        <div className="col">
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
      <div className="main-grp-tags">
        {tags.map((t, i) => (
          <div className="main-grp-tag-item" key={i}>
            {props.tagMap[t]}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="token-item-main-grp" style={{ marginLeft: "-30px" }}>
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
        className="btn btn-primary btn-block main-grp-detail-btn"
        onClick={(e) => {
          props.toggleDetails();
        }}
      >
        {props.detailsOn ? "Details ▼" : "Details ▶"}
      </div>
    );
  }

  return (
    <div className="token-item-main-grp" style={{ marginLeft: "-20px" }}>
      <div className="row">
        <div className="col">
          <W3F />
        </div>
      </div>
      <div className="row">
        <div className="col">
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
        <div className="col-4">
          <MainGrpA token={props.token} />
        </div>
        <div className="col-4">
          <MainGrpB token={props.token} />
        </div>
        <div className="col-2">
          <MainGrpC token={props.token} tagMap={props.tagMap} />
        </div>
        <div className="col-2">
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
    if (tmp.length == 0) {
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
