import React, {useContext} from "react";
import { getLabels, getLeagueLogo } from "../dashboard/sport/SportHandler";
import { loading } from "../util/Util";
import {css, StyleSheet} from "aphrodite";
import {ThemeContext} from "../App";

const styles = (th) =>
    StyleSheet.create({
      box: {
        backgroundColor: th.base
      },
      button: {
        backgroundColor: th.base,
        border: "2px solid " + th.border,
        ":active": {
          backgroundColor: th.accent,
        },
        ":hover": {
          backgroundColor: th.accent,
        }
      },
      active: {
        backgroundColor: th.accent,
      },
      inactive: {
        backgroundColor: th.light,
      }
    });

export function LeagueOption(props) {
  const { theme } = useContext(ThemeContext);
  const styled = styles(theme);
  if (!props || !props.league || !props.click) {
    return null;
  }
  const icon = getLeagueLogo(props.league);
  function className() {
    if (props.disabled === true) {
      return " league-option-inactive " + css(styled.inactive);
    } else if (props.active === true) {
      return " league-option-active " + css(styled.active);
    }
    return "";
  };
  return (
    <div
      className={css(styled.button) + " league-option noselect" + className()}
      onClick={props.click}
    >
      <div className="logo-name-record">
        {icon}
        {props.league}
      </div>
    </div>
  );
}

export default function LeaguePreferenceSelector(props) {
  if (!props || !props.sports || !props.selected || !props.setSelected) {
    return loading;
  }
  const sports = props.sports;
  const selectedLeagues = props.selected;
  function setSelectedLeagues(select) {
    props.setSelected(select);
  }
  const labels = getLabels(sports);
  function checkSportOption(token) {
    if (selectedLeagues.includes(token)) {
      setSelectedLeagues(selectedLeagues.filter((item) => item !== token));
    } else {
      setSelectedLeagues([...selectedLeagues, token]);
    }
  }
  return (
    <div className="league-wrapper">
      {labels.map((league, index) => (
        <LeagueOption
          league={league}
          key={index}
          click={() => checkSportOption(league)}
          disabled={false}
          active={selectedLeagues.includes(league)}
        />
      ))}
    </div>
  );
}
