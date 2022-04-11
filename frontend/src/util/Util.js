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
