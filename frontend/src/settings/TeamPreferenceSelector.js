import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React, {useContext, useState} from "react";
import { getAllTeams, getTeamLogo } from "../dashboard/sport/SportHandler";
import { loading } from "../util/Util";
import {css, StyleSheet} from "aphrodite";
import {ThemeContext} from "../App";
const handleOnSearch = (string, results) => {
  // onSearch will have as the first callback parameter
  // the string searched and for the second the results.
};
const handleOnHover = (result) => {};
const handleOnFocus = () => {};
const formatResult = (item) => {
  return (
    <div className="logo-multiline-words">
      {getTeamLogo(item.sport, item.code, "selector-logo-container")}
      <div className="logo-text">
        <p>
          {item.city} {item.name}
        </p>
        <p>{item.sport}</p>
      </div>
    </div>
  );
};
function itemsEqual(a, b) {
  return (
    a.name === b.name &&
    a.city === b.city &&
    a.sport === b.sport &&
    a.code === b.code
  );
}

const styles = (th) =>
    StyleSheet.create({
        selectedTable: {
            border: "2px solid " + th.border,
        }
    });

export default function TeamPreferenceSelector(props) {
  const selectedTeams = props.selected;
  const [availableTeams, setAvailableTeams] = useState(
    getAllTeams(props.sports).filter(
      (element) => !selectedTeams.some((e) => itemsEqual(e, element))
    )
  );
  const { theme } = useContext(ThemeContext);
  const styled = styles(theme);
  function setSelectedTeams(select) {
    props.setSelected(select);
  }
  if (
    !props ||
    !availableTeams ||
    availableTeams.length === 0 ||
    !props.selected ||
    !props.setSelected
  ) {
    return loading;
  }
  const handleOnSelect = (item) => {
    setAvailableTeams(
      availableTeams.filter((element) => !itemsEqual(element, item))
    );
    setSelectedTeams((oldArray) => [...oldArray, item]);
  };
  function removeSelected(index) {
    const select = selectedTeams[index];
    setAvailableTeams((old) => [...old, select]);
    setSelectedTeams(
      selectedTeams.filter((element) => !itemsEqual(element, select))
    );
  }
  return (
    <div className="team-wrapper">
      <ReactSearchAutocomplete
        items={availableTeams}
        onSearch={handleOnSearch}
        fuseOptions={{
          keys: ["city", "name", "sport"],
          threshold: 0.2,
          maxPatternLength: 32,
          minMatchCharLength: 1,
        }}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        styling={{height: "30px"}}
      />
      {
        selectedTeams.length > 0 &&
        <div className={css(styled.selectedTable) + " selected-table"}>
        {selectedTeams.map((row, index) => {
          return (
            <div className="selected-team" key={index}>
              <button
                className="remove-button"
                onClick={() => removeSelected(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
              <div className="logo-multiline-words">
                {getTeamLogo(row.sport, row.code, "selector-logo-container")}
                {row.city} {row.name} ({row.sport})
              </div>
            </div>
          );
        })}
      </div>
      }
    </div>
  );
}
