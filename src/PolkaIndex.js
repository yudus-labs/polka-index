import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchDB, fetchSetting, fetchCoinInfo } from "./common/API";

import HeadSection from "./components/Head";
import FilterSection from "./components/Filter";
import TokenSection from "./components/Token";

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

/**
 * Fetch setting and tokens DB from external JSON source
 * @param {Object} state
 * @param {Function} setState
 */
function fetchData(state, setState) {
  // Fetch setting first
  fetchSetting().then((data) => {
    const setting = JSON.parse(data);
    // console.log(setting.tag_map);
    setState((s) => {
      let filter = s.filter;
      filter.curTags = Object.keys(setting.tag_map);

      return {
        tokens: s.tokens,
        tagMap: setting.tag_map,
        filter: filter,
      };
    });
  });

  // Then fetch tokens DB
  fetchDB().then((data) => {
    const db = JSON.parse(data);
    let tokens = db.tokens;
    // console.log(tokens);

    fetchTokens(tokens);

    setState((s) => ({ tokens: tokens, tagMap: s.tagMap, filter: s.filter }));
  });
}

function PolkaIndex() {
  const [state, setState] = useState({
    tokens: [],
    tagMap: {},
    filter: {
      curTags: [],
      listed: true,
    },
  });

  const updateFilter = (filter) => {
    setState((s) => ({ tokens: s.tokens, tagMap: s.tagMap, filter: filter }));
  };

  useEffect(() => {
    fetchData(state, setState);
  }, []);

  return (
    <div className="container polka-index">
      <HeadSection />
      <FilterSection
        filter={state.filter}
        updateFilter={updateFilter}
        tagMap={state.tagMap}
      />
      <TokenSection
        tokens={state.tokens}
        filter={state.filter}
        tagMap={state.tagMap}
      />
    </div>
  );
}

export default PolkaIndex;
