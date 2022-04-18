import {themes} from "./Theme";
import {errorSuffix} from "../util/Util";
import {toast} from "react-hot-toast";

export default function ThemeSelector(props) {
    if (!props || !props.theme || !props.setTheme) {
        return errorSuffix("loading themes");
    }
    function setTheme(theme) {
        props.setTheme(theme);
        toast.success("Theme updated!");
    }
    return (
        <div className="theme-selector">
            {Object.keys(themes).map((th) => <div className="theme-selection" onClick={() => setTheme(themes[th])} style={{backgroundColor: themes[th].base}} />)}
        </div>
    )
}