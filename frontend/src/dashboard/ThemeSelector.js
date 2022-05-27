import { themes } from "./Theme";
import { toast } from "react-hot-toast";
import { Dropdown } from "react-bootstrap";
import React, { useContext } from "react";
import { ThemeContext } from "../App";
import { css } from "aphrodite";
import { setUserTheme } from "../user/UserHandler";
import { loading } from "../util/Util";

function icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-paint-bucket"
      viewBox="0 0 16 16"
    >
      <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z" />
    </svg>
  );
}

export default function ThemeSelector(props) {
  const { theme, setTheme } = useContext(ThemeContext);
  if (!props.user) {
    return loading;
  }
  function setAndToast(th) {
    try {
      toast
        .promise(
          setUserTheme(
            props.user,
            Object.entries(themes)
              .find((e) => e[1] === th)[0]
              .trim()
          ),
          {
            loading: "Saving theme...",
            success: <b>Theme saved!</b>,
            error: <b>Could not save.</b>,
          }
        )
        .then((r) => {
          if (r.status === 201) {
            setTheme(th);
          } else {
            console.log("Error: " + r.status);
          }
        });
    } catch (e) {
      console.log(e);
      toast.error("Could not set theme");
      return false;
    }
  }
  return (
    <Dropdown autoClose={true} className="nomargin">
      <Dropdown.Toggle
        variant="success"
        className={
          props.styled
            ? css(props.styled.dropdown) + " header-dropdown"
            : "header-dropdown"
        }
        style={{ backgroundColor: "#FFFFFF", color: theme.base }}
      >
        {icon()}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ padding: "0px" }}>
        <div className="theme-selector">
          {Object.keys(themes).map((th, index) => (
            <div
              className="theme-selection"
              key={index}
              onClick={() => setAndToast(themes[th])}
              style={{ backgroundColor: themes[th].base }}
            />
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
