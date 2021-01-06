import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Token.css";

function TokenItemDetails(props) {
  return (
    <div className="token-item-detail">
      <b>Market cap : {props.details.cap}</b>
    </div>
  );
}
TokenItemDetails.propTypes = {
  details: PropTypes.object,
};

function TokenItemMain(props) {
  return <div className="token-item-main">{props.token.name}</div>;
}
TokenItemMain.propTypes = {
  token: PropTypes.object,
};

function TokenItem(props) {
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
    <div className="row token-item">
      <div className="col">
        <TokenItemMain token={props.token} />
        <TokenItemDetails details={props.token.details} />
      </div>
    </div>
  );
}
TokenItem.propTypes = {
  token: PropTypes.object,
  filter: PropTypes.object,
};

export default function TokenSection(props) {
  return (
    <div className="container-fluid token-section">
      <div className="container token-section">
        {props.tokens.map((t, i) => (
          <TokenItem
            token={t}
            filter={props.filter}
            key={t.name + i.toString()}
          />
        ))}
      </div>
    </div>
  );
}
TokenSection.propTypes = {
  tokens: PropTypes.array,
  filter: PropTypes.object,
  tagMap: PropTypes.object,
};
