import { Spinner } from "react-bootstrap";
import React, {useState} from "react";

export function isOneLoading(queries) {
  for (const query of queries) {
    if (query.isLoading) {
      return true;
    }
  }
  return false;
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

export function Collapsible(props) {
  const [open, setOpen] = useState(true);
  const caret = (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down"
           viewBox="0 0 16 16">
        <path
            d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
      </svg>
  )
  if (!props) {
    return null;
  }
  return (
      <div className="collapsible">
        {
          <p className="collapsible-header" onClick={() => setOpen(!open)}>
            {props.icon && props.icon}
            {props.title && props.title}
            {caret}
          </p>
        }
        {
          (open === true) &&
          <div className="collapsible-content">
            {props.children}
          </div>
        }
      </div>
  )
}

/*export function CheckOption(props) {
  const [checked, setChecked] = useState(true);
  if (!props) {
    return null;
  }
  return (
      <div className="check-option" onClick={() => setChecked(!checked)}>
        <div className={"check-option-box " + (checked && "check-option-box-checked")} />
        {
          props.label &&
          <p className="check-option-label">{props.label}</p>
        }
      </div>
  )
}*/

export function RangeOption(props) {
  const value = props.value;
  const setValue = props.setValue;
  if (!props || !props.min || !props.max || !value || !setValue) {
    return null;
  }
  function handleChange(event) {
    setValue(parseInt(event.target.value));
  }
  return (
      <div className="range-option">
        {
          props.label &&
          <p className="range-option-label">{props.label} {value}</p>
        }
        <input type="range" className="form-range range-option-slider" min={props.min} max={props.max} step="1" defaultValue={value} onChange={handleChange} />
      </div>
  )
}
