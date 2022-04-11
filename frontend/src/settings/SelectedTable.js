import Button from "react-bootstrap/Button";
import { getTeamLogo } from "../dashboard/sport/SportHandler";
import "../style/selector.scss";
import React from "react";

export default function SelectedTable(props) {
  if (!props || props.selectedData.length < 1) {
    return null;
  }
  return (
    <div className="selected-table">
      {props.selectedData.map((row, index) => {
        return (
          <div className="selected-team" key={index}>
            <Button
              className="remove-button"
              variant="danger"
              onClick={() => props.removeSelected(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </Button>
            <div className="logo-multiline-words">
              {getTeamLogo(row.sport, row.code, null)}
              {row.city} {row.name} ({row.sport})
            </div>
          </div>
        );
      })}
    </div>
  );
}
