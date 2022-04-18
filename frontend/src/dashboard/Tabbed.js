import "../style/tab.scss";
import React, {useContext} from "react";
import {ThemeContext} from "../App";
import {useHoverActive} from "../util/Util";

export function Tab(props) {
  const { theme } = useContext(ThemeContext);
  const [tabHover, tabUnhover, tabStyle] = useHoverActive({}, { backgroundColor: theme.accent }, { backgroundColor: theme.base }, theme, props.active)
  if (!props || !props.title || !props.click) {
    return null;
  }
  const icon = props.icon ? props.icon : null;
  return (
    <div className="tab noselect" onClick={props.click} onMouseEnter={tabHover} onMouseLeave={tabUnhover} style={tabStyle}>
      <div className="logo-name-record">
        {icon}
        {props.title}
      </div>
    </div>
  );
}

export default function Tabbed(props) {
  const [currentTab, setCurrentTab] = React.useState(
    props.default ? props.default : 0
  );
  if (!props || !props.children || !props.titles) {
    return null;
  }
  const icons = props.icons ? props.icons : [];
  const tabs = props.titles.map((title, index) => {
    const icon = icons[index] != null ? icons[index] : null;
    return (
      <Tab
        active={currentTab === index}
        icon={icon}
        title={title}
        key={index}
        click={() => setTab(index)}
      />
    );
  });
  let pages;
  try {
    pages = props.children.map((child, index) => {
      return (
        <div className="tab-content" key={index}>
          {child}
        </div>
      );
    });
  } catch (error) {
    pages = [<div className="tab-content">{props.children}</div>];
  }
  function setTab(index) {
    setCurrentTab(index);
  }
  return (
    <div className="tab-group">
      <div className="tabs">{tabs}</div>
      {pages[currentTab]}
    </div>
  );
}
