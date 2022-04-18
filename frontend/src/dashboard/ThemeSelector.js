import {themes} from "./Theme";
import {errorSuffix} from "../util/Util";

export default function ThemeSelector(props) {
    if (!props || !props.theme || !props.setTheme) {
        return errorSuffix("loading themes");
    }
    return (
        <div className="theme-selector">
            <div className="theme-selection" onClick={() => props.setTheme(themes.red)} style={{backgroundColor: themes.red.base}} />
            <div className="theme-selection" onClick={() => props.setTheme(themes.blue)} style={{backgroundColor: themes.blue.base}} />
        </div>
    )
}