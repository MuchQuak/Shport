import React, {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";

export function allQueriesSuccessful(queries) {
  for (let query of queries) {
    if (!query.isSuccess) {
      return false;
    }
  }
  return true;
}

export const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

export const error = <p className="error nomargin bold">Error!</p>;

export const errorSuffix = (suffix) => (
  <p className="error nomargin bold">Error {suffix}!</p>
);

export const loading = (
      <div className="loading nomargin">
        <p className="nomargin bold">Loading...</p>
        <Spinner animation="border" variant="primary" />
      </div>
    );

export const loadingSuffix = (suffix) => (
    <div className="loading nomargin">
      <p className="nomargin bold">Loading {suffix}...</p>
      <Spinner animation="border" variant="primary" />
    </div>
);

export function suffix(i) {
  const j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

export function useHover(baseStyle, hoverStyle, unhoverStyle, dep) {
  const [style, setStyle] = useState({...baseStyle, ...unhoverStyle});
  useEffect(() => {
    setStyle({...baseStyle, ...unhoverStyle});
  }, [dep]);
  function hover() {
    setStyle({...baseStyle, ...hoverStyle});
  }
  function unhover() {
    setStyle({...baseStyle, ...unhoverStyle});
  }
  return [hover, unhover, style];
}

export function useHoverActive(baseStyle, hoverStyle, unhoverStyle, dep, active) {
  const [style, setStyle] = useState({...baseStyle, ...unhoverStyle});
  useEffect(() => {
    if (active) {
      setStyle({...baseStyle, ...hoverStyle});
    } else {
      setStyle({...baseStyle, ...unhoverStyle});
    }
  }, [dep, active]);
  function hover() {
    if (!active) {
      setStyle({...baseStyle, ...hoverStyle});
    }
  }
  function unhover() {
    if (!active) {
      setStyle({...baseStyle, ...unhoverStyle});
    }
  }
  return [hover, unhover, style];
}