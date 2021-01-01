import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDB, getSetting } from "./common/API";

import "./PolkaIndex.css";

function PolkaIndex() {
  const [state, setState] = useState({
    db: "Fetching DB...",
    setting: "Fetching setting...",
  });

  useEffect(() => {
    getDB().then((data) => {
      const db = JSON.parse(data);
      console.log(db);
      setState({ db: db });
    });

    getSetting().then((data) => {
      const setting = JSON.parse(data);
      console.log(setting);
      setState({ setting: setting });
    });
  }, []);

  return <div className="container polka-index">Polka Index</div>;
}

export default PolkaIndex;
