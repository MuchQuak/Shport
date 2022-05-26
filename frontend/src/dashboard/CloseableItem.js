import "../style/item.scss";
import React, { useContext, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { ThemeContext } from "../App";

export default function CloseableItem(props) {
  const [itemVisible, setItemVisible] = useState(true);
  const { theme } = useContext(ThemeContext);
  if (!props) {
    return null;
  }
  let prefs = [];
  if (props.prefs) {
    prefs = props.prefs;
  }
  let sports = [];
  if (props.sports) {
    sports = props.sports;
  }
  const setInvisible = () => {
    setItemVisible(false);
  };
  function title() {
    return props.title ? props.title : "Untitled Item";
  }
  function link() {
    return props.link ? props.link : null;
  }
  function logo() {
    return props.logo ? props.logo : null;
  }
  function children() {
    return props.children
      ? React.cloneElement(props.children, { prefs: prefs, sports: sports })
      : null;
  }
  if (itemVisible) {
    return (
      <div className="item">
        <div className="item-title" style={{ backgroundColor: theme.base }}>
          <div className="leftSpace">{logo()}</div>
          <div className="middleSpace">
            {link() === null ? <p>{title()}</p> : <a href={link()}><p>{title()}</p></a>}
          </div>
          <div className="rightSpace">
            <CloseButton
              className="closeButton"
              variant="white"
              aria-label="Hide"
              onClick={setInvisible}
            />
          </div>
        </div>
        <div className="item-body">{children()}</div>
      </div>
    );
  }
  return null;
}
