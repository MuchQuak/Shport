import {css, StyleSheet} from "aphrodite";
import React, {useContext, useState} from "react";
import {ThemeContext} from "../App";
import {useQuery} from "react-query";
import {userSportsQuery} from "./UserHandler";
import {errorSuffix, loadingSuffix} from "../util/Util";

const styles = (th) =>
    StyleSheet.create({
        box: {
            backgroundColor: th.base
        },
        button: {
            backgroundColor: th.base,
            border: "2px solid " + th.border,
            ":active": {
                backgroundColor: th.accent,
            },
            ":hover": {
                backgroundColor: th.accent,
            }
        }
    });

export function UserProfile(props) {
    const userquery = useQuery([props.name], () => userSportsQuery(props.name));
    if (userquery.isLoading) {
        return loadingSuffix("user");
    } else if (userquery.isError) {
        return errorSuffix("loading user information");
    }
    return <div className="nomargin">{JSON.stringify(userquery.data)}</div>;
}

export default function UserSearch() {
    const { theme } = useContext(ThemeContext);
    const styled = styles(theme);
    const [name, setName] = useState("");
    const [search, setSearch] = useState("");
    function handleSearch(event) {
        event.preventDefault();
        setSearch(name);
    }
    return (
        <div className={css(styled.box) + " boxed settings"}>
            <h1 className="boxed-header">User Search</h1>
            <div className="wrapper">
                <input type="text" placeholder="Find a user..." onChange={(e) => setName(e.target.value)} />
                <button
                    className={css(styled.button) + " button margin-top-5"}
                    onClick={(e) => handleSearch(e)}
                >
                    Find User
                </button>
                {search !== "" && <UserProfile name={search} />}
            </div>
        </div>
    );
}