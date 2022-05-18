import "../style/tab.scss";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { css, StyleSheet } from "aphrodite";
import {favoriteIcon} from "./sport/SportHandler";

const styles = (th) =>
  StyleSheet.create({
    tab: {
      backgroundColor: th.base,
      ":hover": {
        backgroundColor: th.accent,
      },
    },
    tabActive: {
      backgroundColor: th.accent,
    },
  });

export function Tab(props) {
  const { theme } = useContext(ThemeContext);
  if (!props || !props.title || !props.click) {
    return null;
  }
  const icon = props.icon ? props.icon : null;
  const styled = styles(theme);
  return (
    <div
      className={
        css(props.active ? styled.tabActive : styled.tab) + " tab noselect" +
        (props.title === favoriteIcon ? " tab-favorite" : "")
      }
      onClick={props.click}
    >
      <div className="logo-name-record">
        {icon}
        {props.title}
      </div>
    </div>
  );
}

export default function Tabbed(props) {
  const [currentTab, setCurrentTab] = useState(
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
