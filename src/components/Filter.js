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

function ToggleAboutBtn(props) {
  return (
    <div
      type="button"
      className="btn btn-primary btn-sm toggle-about-btn"
      onClick={(e) => {
        props.toggleAbout();
      }}
    >
      {props.aboutShowed ? "Close About" : "About"}
    </div>
  );
}
ToggleAboutBtn.propTypes = {
  aboutShowed: PropTypes.bool,
  toggleAbout: PropTypes.func,
};

function ToggleAllTagsBtn(props) {
  return (
    <div
      type="button"
      className="btn btn-primary btn-sm toggle-all-tags-btn"
      onClick={(e) => {
        props.toggleAllTags();
      }}
    >
      Toggle all tags
    </div>
  );
}
ToggleAllTagsBtn.propTypes = {
  toggleAllTags: PropTypes.func,
};

function Search(props) {
  return (
    <input
      type="text"
      className="form-control search-input"
      value={props.keyword}
      onChange={(e) => {
        const filter = props.filter;
        filter.keyword = e.target.value;
        props.updateFilter(filter);
      }}
      placeholder="Search"
    />
  );
}
Search.propTypes = {
  updateFilter: PropTypes.func,
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
  const defaultTags = Object.keys(props.tagMap);

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

  const toggleAllTags = () => {
    const filter = props.filter;
    if (filter.curTags.length === 0) {
      filter.curTags = defaultTags;
    } else {
      filter.curTags = [];
    }
    props.updateFilter(filter);
  };

  return (
    <div className="container-fluid filter-section">
      <div className="row justify-content-between" style={{ margin: 0 }}>
        {/* Tag Items */}
        <div className="col-8">
          <div className="row">
            {defaultTags.map((tagValue) => (
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
        <div className="col-4">
          <div className="row justify-content-end">
            <div className="col-auto">
              <div className="row justify-content-end mb-3">
                <ToggleAboutBtn
                  toggleAbout={props.toggleAbout}
                  aboutShowed={props.aboutShowed}
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="row justify-content-end">
                <ListedBtn toggleListed={toggleListed} filter={props.filter} />
                <ToggleAllTagsBtn toggleAllTags={toggleAllTags} />
                <Search
                  updateFilter={props.updateFilter}
                  filter={props.filter}
                />
              </div>
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
  toggleAbout: PropTypes.func,
  aboutShowed: PropTypes.bool,
};
