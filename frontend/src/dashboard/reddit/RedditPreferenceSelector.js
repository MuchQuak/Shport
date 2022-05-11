import React from "react";
import {redditLogo} from "./RedditHandler";
import {Collapsible, RangeOption} from "../../util/Util";

export default function RedditPreferenceSelector(props) {
    const leaguePosts = props.leaguePosts;
    const setLeaguePosts = props.setLeaguePosts;
    const teamPosts = props.teamPosts;
    const setTeamPosts = props.setTeamPosts;
    if (!props || !props.prefs || !setLeaguePosts || !setTeamPosts) {
        return null;
    }
    return (
        <Collapsible title="Reddit Settings" default={false} icon={redditLogo()}>
            <RangeOption label="League Posts:" value={leaguePosts} setValue={setLeaguePosts} min="0" max="10" />
            <RangeOption label="Team Posts:" value={teamPosts} setValue={setTeamPosts} min="0" max="10" />
        </Collapsible>
    )
}