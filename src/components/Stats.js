import React, { useEffect, useState, PureComponent } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./Stats.css";
import { render } from "@testing-library/react";

function Chart(props) {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          // width={500}
          height={300}
          data={props.ksmRateHistory}
          // margin={{
          //   top: 5,
          //   right: 15,
          //   left: 15,
          //   bottom: 5,
          // }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" hide={true} />
          <YAxis yAxisId="left" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rate"
            stroke="#36b37e"
            activeDot={{ r: 8 }}
            dot={false}
            name="KSM/DOT Rate"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function StatsSection(props) {
  return (
    <div className="container-fluid stats-section">
      <div className="row">
        <div className="col">
          <div className="ksm-dot-rate">
            {" "}
            Current <b>KSM/DOT</b> Rate :{" "}
            <b>{(props.prices.ksm / props.prices.dot).toFixed(2)}</b>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Chart ksmRateHistory={props.ksmRateHistory} />
        </div>
      </div>
    </div>
  );
}
StatsSection.propTypes = {
  prices: PropTypes.object,
  ksmRateHistory: PropTypes.array,
};
