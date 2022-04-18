import {themes} from "./Theme";
import {errorSuffix} from "../util/Util";

export default function ThemeSelector(props) {
    if (!props || !props.theme || !props.setTheme) {
        return errorSuffix("loading themes");
    }
    return (
        <div className="theme-selector">
            {Object.keys(themes).map((th) => <div className="theme-selection" onClick={() => props.setTheme(themes[th])} style={{backgroundColor: themes[th].base}} />)}
        </div>
    )
}