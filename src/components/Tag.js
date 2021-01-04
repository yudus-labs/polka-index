import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Tag.css";

function TagItem(props) {
  return (
    <div
      type="button"
      className="btn btn-primary btn-sm tag-item"
      onClick={props.toggleTag}
    >
      {props.tagValue}
    </div>
  );
}

export default function TagSection(props) {
  return <div className="container-fluid tag-section">Tag section</div>;
}
