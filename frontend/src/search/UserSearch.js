import {css, StyleSheet} from "aphrodite";
import React, {useContext} from "react";
import {ThemeContext} from "../App";

const styles = (th) =>
    StyleSheet.create({
        box: {
            backgroundColor: th.base
        },
    });

export default function UserSearch() {
    const { theme } = useContext(ThemeContext);
    const styled = styles(theme);
    return (
        <div className={css(styled.box) + " boxed settings"}>
            <h1 className="boxed-header">User Search</h1>
            <div className="wrapper">
                <input type="text" placeholder="Find a user..." />
            </div>
        </div>
    );
}