import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Filter.css";

function ListedBtn(props) {
  const isOn = () => {
    return props.filter.listed;
  };
  return (
    <div
      type="button"
      className={`btn btn-primary btn-sm ${
        isOn() ? "listed-btn-on" : "listed-btn-off"
      }`}
      onClick={(e) => {
        props.toggleListed();
      }}
    >
      {props.filter.listed ? "Listed on exchange" : "Not listed yet"}
    </div>
  );
}
ListedBtn.propTypes = {
  toggleListed: PropTypes.func,
  filter: PropTypes.object,
};

function TagBtn(props) {
  const isOn = () => {
    return props.filter.curTags.includes(props.tagValue);
  };
  return (
    <div
      type="button"
      className={`btn btn-primary btn-sm ${
        isOn() ? "tag-btn-on" : "tag-btn-off"
      }`}
      onClick={(e) => {
        props.toggleTag(props.tagValue);
      }}
    >
      {props.tagMap[props.tagValue]}
    </div>
  );
}
TagBtn.propTypes = {
  tagValue: PropTypes.string,
  toggleTag: PropTypes.func,
  filter: PropTypes.object,
  tagMap: PropTypes.object,
};

export default function FilterSection(props) {
  const toggleTag = (tagValue) => {
    const filter = props.filter;
    if (filter.curTags.includes(tagValue)) {
      filter.curTags = filter.curTags.filter((e) => e !== tagValue);
    } else {
      filter.curTags.push(tagValue);
    }

    props.updateFilter(filter);
  };

  const toggleListed = () => {
    const filter = props.filter;

    filter.listed = !filter.listed;

    props.updateFilter(filter);
  };

  return (
    <div className="container-fluid filter-section">
      <div className="container filter-section">
        <div className="row justify-content-between">
          {/* Tag Items */}
          <div className="col-9">
            <div className="row">
              {Object.keys(props.tagMap).map((tagValue) => (
                <TagBtn
                  tagValue={tagValue}
                  toggleTag={toggleTag}
                  filter={props.filter}
                  tagMap={props.tagMap}
                  key={tagValue}
                />
              ))}
            </div>
          </div>

          {/* On Exchange toggle */}
          <div className="col-3">
            <div className="row justify-content-end">
              <ListedBtn toggleListed={toggleListed} filter={props.filter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
FilterSection.propTypes = {
  filter: PropTypes.object,
  updateFilter: PropTypes.func,
  tagMap: PropTypes.object,
};
