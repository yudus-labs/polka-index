import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchDB, fetchSetting, fetchCoinInfo } from "./common/API";

import HeadSection from "./components/Head";
import FilterSection from "./components/Filter";
import TokenSection from "./components/Token";

import "./PolkaIndex.css";

function fetchTokens(tokens, setState) {
  const new_tokens = tokens.filter((t) => !t.cg_id);

  tokens.forEach((token) => {
    if (token.cg_id) {
      fetchCoinInfo(token.cg_id).then((data) => {
        const coinInfo = JSON.parse(data);
        const t = JSON.parse(JSON.stringify(token));

        // console.log(coinInfo);
        t.logo = coinInfo.image.small;
        t.symbol = coinInfo.symbol;
        t.name = coinInfo.name;
        t.price = coinInfo.market_data.current_price.usd;
        t.price_change_24h = coinInfo.market_data.price_change_percentage_24h;
        t.atl = coinInfo.market_data.atl.usd;
        t.ath = coinInfo.market_data.ath.usd;
        t.rank = coinInfo.market_data.market_cap_rank;
        t.details.homepage = coinInfo.links.homepage[0];
        t.details.cap = coinInfo.market_data.market_cap.usd;
        t.details.diluted_cap =
          coinInfo.market_data.fully_diluted_valuation.usd;
        t.details.supply = coinInfo.market_data.circulating_supply;
        t.details.total_supply = coinInfo.market_data.total_supply;
        t.details.max_supply = coinInfo.market_data.max_supply;

        new_tokens.push(t);

        new_tokens.sort((a, b) => {
          return parseInt(b.details.cap) - parseInt(a.details.cap);
        });

        setState((s) => ({
          tokens: new_tokens,
          tagMap: s.tagMap,
          filter: s.filter,
        }));
      });
    }
  });
}

/**
 * Fetch setting and tokens DB from external JSON source, 
 * then fetch real market data from CoinGecko
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

    // And fetch market data
    fetchTokens(db.tokens, setState);
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
