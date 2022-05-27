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
        },
        profileHeader: {
            margin: "2px",
            padding: "3px",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            borderRadius: "5px",
            backgroundColor: th.border,
        },
        profileName: {
            margin: "0",
            padding: "0",
            fontSize: "1.2em",
            fontWeight: "bold",
            color: "#FFFFFF"
        }
    });

export function UserProfile(props) {
    const { theme } = useContext(ThemeContext);
    const styled = styles(theme);
    const uq = useQuery([props.name], () => userSportsQuery(props.name), {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 0
    });
    if (uq.isLoading) {
        return loadingSuffix("user");
    } else if (uq.isError) {
        return errorSuffix("finding user");
    }
    return (
        <div className="profile" style={{display: "flex", flexFlow: "column nowrap", justifyContent: "flex-start", alignItems: "center"}}>
            <div className={"profile-header " + css(styled.profileHeader)}>
                <p className={"profile-name " + css(styled.profileName)}>{props.name}</p>
            </div>
            {Object.keys(uq.data).filter((s) => uq.data[s] && uq.data[s].teams && uq.data[s].teams.length > 0).map((sport) => {
                return (
                    <div key={sport}>
                        <p className="nomargin">{sport}: {uq.data[sport].teams.join(", ")}</p>
                    </div>
                )
            })}
        </div>
    );
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
                <div style={{display: "flex", flexFlow: "row nowrap", gap: "5px", justifyContent: "center", alignItems: "center"}}>
                    <input
                        type="text"
                        placeholder="Find a user..."
                        style={{flexBasis: "80%", padding: "2px"}}
                        onChange={(e) => setName(e.target.value)} />
                    <button
                        className={css(styled.button) + " button margin-top-5 margin-bottom-5"}
                        style={{flexBasis: "20%"}}
                        onClick={(e) => handleSearch(e)}
                    >
                        Find
                    </button>
                </div>
                {search !== "" && <UserProfile name={search} />}
            </div>
        </div>
    );
}