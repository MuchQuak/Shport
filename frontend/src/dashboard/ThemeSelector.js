import {themes} from "./Theme";
import {toast} from "react-hot-toast";
import {Dropdown} from "react-bootstrap";
import {useContext} from "react";
import {ThemeContext} from "../App";

function icon() {
    return (
<></>
    );
}

export default function ThemeSelector() {
    const { theme, setTheme } = useContext(ThemeContext);
    function setAndToast(th) {
        setTheme(th);
        toast.success("Theme updated!");
    }
    return (
        <Dropdown autoClose={true}>
            <Dropdown.Toggle variant="success" id="dropdown-autoclose-true" style={{ border: "0", backgroundColor: "#FFFFFF", color: theme.base }} >
                {icon()}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ padding: "5px" }}>
                <div className="theme-selector">
                    {Object.keys(themes).map((th, index) => <div className="theme-selection" key={index} onClick={() => setAndToast(themes[th])} style={{backgroundColor: themes[th].base}} />)}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}