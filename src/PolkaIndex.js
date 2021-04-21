import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import {
  fetchDB,
  fetchSetting,
  fetchCoinInfo,
  fetchPriceHistory,
} from "./common/API";

import HeadSection from "./components/Head";
import FilterSection from "./components/Filter";
import TokenSection from "./components/Token";
import StatsSection from "./components/Stats";

import "./PolkaIndex.css";

const KSM_SYMBOL = "ksm";
const DOT_SYMBOL = "dot";
const KSM_CG_ID = "kusama";
const DOT_CG_ID = "polkadot";

ReactGA.initialize("UA-169204893-5");
ReactGA.pageview(window.location.pathname + window.location.search);

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
          prices: {
            ksm: t.symbol === KSM_SYMBOL ? t.price : s.prices.ksm,
            dot: t.symbol === DOT_SYMBOL ? t.price : s.prices.dot,
          },
          ksmRateHistory: s.ksmRateHistory,
        }));
      });
    }
  });
}

function fetchHistory(setState) {
  fetchPriceHistory(KSM_CG_ID).then((ksmHistory) => {
    fetchPriceHistory(DOT_CG_ID).then((dotHistory) => {
      const dotPrices = JSON.parse(dotHistory).prices;
      const ksmPrices = JSON.parse(ksmHistory).prices.slice(-dotPrices.length);

      const rateHistory = dotPrices.map((e, i) => {
        const date = new Date(e[0]).toLocaleString();
        return {
          time: date,
          rate: parseFloat((ksmPrices[i][1] / e[1]).toFixed(2)),
        };
      });
      // console.log(rateHistory);

      setState((s) => ({
        tokens: s.tokens,
        tagMap: s.tagMap,
        filter: s.filter,
        prices: s.prices,
        ksmRateHistory: rateHistory,
        aboutShowed: s.aboutShowed,
      }));
    });
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
        prices: s.prices,
        ksmRateHistory: s.ksmRateHistory,
      };
    });
  });

  // Then fetch ksm/dot price history and calculate their rate
  fetchHistory(setState);

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
      keyword: "",
    },
    prices: { ksm: 0, dot: 0 },
    ksmRateHistory: [],
    aboutShowed: false,
  });

  const updateFilter = (filter) => {
    setState((s) => ({
      tokens: s.tokens,
      tagMap: s.tagMap,
      filter: filter,
      prices: s.prices,
      ksmRateHistory: s.ksmRateHistory,
      aboutShowed: s.aboutShowed,
    }));
  };

  const toggleAbout = () => {
    let showed = !state.aboutShowed;
    setState((s) => ({
      tokens: s.tokens,
      tagMap: s.tagMap,
      filter: s.filter,
      prices: s.prices,
      ksmRateHistory: s.ksmRateHistory,
      aboutShowed: showed,
    }));
  };

  useEffect(() => {
    fetchData(state, setState);
  }, []);

  return (
    <div className="container polka-index">
      <HeadSection aboutShowed={state.aboutShowed} />
      <FilterSection
        filter={state.filter}
        updateFilter={updateFilter}
        tagMap={state.tagMap}
        toggleAbout={toggleAbout}
        aboutShowed={state.aboutShowed}
      />
      <StatsSection
        prices={state.prices}
        ksmRateHistory={state.ksmRateHistory}
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
