import { Spinner } from "react-bootstrap";

export function allQueriesSuccessful(queries) {
  for (const query of queries) {
    if (!query.isSuccess) {
      return false;
    }
  }
  return true;
}

export const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

export const error = (
  <div className="error">
    <p className="bold">Error!</p>
  </div>
);

export const errorSuffix = (suffix) => (
  <div className="error">
    <p className="bold">Error {suffix}!</p>
  </div>
);

const loadSpinner = (
  <Spinner animation="grow" role="status" variant="dark">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export const loading = (
  <div className="loading">
    <p className="nomargin bold">Loading...</p>
    {loadSpinner}
  </div>
);

export const loadingSuffix = (suffix) => (
  <div className="loading">
    <p className="nomargin bold">Loading {suffix}...</p>
    {loadSpinner}
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

export function verify(result) {
  if (result.data === undefined || !result.data) {
    throw new Error("Error: Retrieved no data");
  }
  return result.data;
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
