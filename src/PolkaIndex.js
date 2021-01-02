import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchDB, fetchSetting, fetchCoinInfo } from "./common/API";

import "./PolkaIndex.css";

function fetchTokens(tokens) {
  tokens.forEach((t) => {
    if (t.cg_id) {
      fetchCoinInfo(t.cg_id).then((data) => {
        const coinInfo = JSON.parse(data);
        // console.log(coinInfo);
        t.logo = coinInfo.image.small;
        t.symbol = coinInfo.symbol;
        t.name = coinInfo.name;
        t.price = coinInfo.market_data.current_price.usd;
        t.price_change_24h = coinInfo.market_data.price_change_percentage_24h;
        t.atl = coinInfo.market_data.atl.usd;
        t.ath = coinInfo.market_data.ath.usd;
        t.details.homepage = coinInfo.links.homepage[0];
        t.details.cap = coinInfo.market_data.market_cap.usd;
        t.details.diluted_cap =
          coinInfo.market_data.fully_diluted_valuation.usd;
        t.details.supply = coinInfo.market_data.circulating_supply;
        t.details.total_supply = coinInfo.market_data.total_supply;
        t.details.max_supply = coinInfo.market_data.max_supply;
      });
    }
  });
}

function fetchData(state, setState) {
  fetchSetting().then((data) => {
    const setting = JSON.parse(data);
    // console.log(setting.tag_map);
    setState((s) => ({ tokens: s.tokens, tagMap: setting.tag_map }));
  });

  fetchDB().then((data) => {
    const db = JSON.parse(data);
    let tokens = db.tokens;
    // console.log(tokens);

    fetchTokens(tokens);

    setState((s) => ({ tokens: tokens, tagMap: s.tagMap }));
  });
}

function PolkaIndex() {
  const [state, setState] = useState({
    tokens: "Fetching tokens...",
    tagMap: "Fetching tag map...",
  });

  useEffect(() => {
    fetchData(state, setState);
  }, []);

  return <div className="container polka-index">Polka Index</div>;
}

export default PolkaIndex;
