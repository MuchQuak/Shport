import React from "react";

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

export const loading = <p className="nomargin bold">Loading...</p>;

export const loadingSuffix = (suffix) => (
  <p className="nomargin bold">Loading {suffix}...</p>
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
