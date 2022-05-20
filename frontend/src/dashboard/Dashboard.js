import React, {useContext} from "react";
import "../style/dashboard.scss";
import TeamOverview from "./sport/TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from "./sport/StandingsTable";
import Schedule from "./sport/Schedule";
import Article from "./news/Article";
import { createTeamQuery, joinArticles, useNews } from "./news/NewsHandler";
import {
  getAllTeamsFollowed,
  getSportsFollowed,
} from "../settings/PrefHandler";
import { isOneLoading, errorSuffix, loadingSuffix } from "../util/Util";
import {useTeamSubreddits, useLeagueSubreddits, redditLogo, getTeamPosts, getLeaguePosts} from "./reddit/RedditHandler";
import RedditPost from "./reddit/RedditPost";
import {ThemeContext} from "../App";
import {css, StyleSheet} from "aphrodite";
import { isMobile } from 'react-device-detect';

function condConcat(base, ...adds) {
  for (const [condition, items] of adds) {
    if (condition) {
      base = base.concat(items());
    }
  }
  return base;
}

function defaultItems(prefs, sports) {
  return [
    <CloseableItem title="Schedule" prefs={prefs} sports={sports} key={"item1"}>
      <Schedule />
    </CloseableItem>,
    <CloseableItem
      title="Followed Teams"
      prefs={prefs}
      sports={sports}
      key={"item2"}
    >
      <TeamOverview />
    </CloseableItem>,
    <CloseableItem
      title="Standings"
      prefs={prefs}
      sports={sports}
      key={"item3"}
    >
      <StandingsTable />
    </CloseableItem>,
  ];
}
function articleItems(news) {
  return news.map((article, idx) => (
    <CloseableItem
      title={article.publishBy}
      key={"articleitem" + article.url + String(idx)}
    >
      <Article news={article} key={article.url} />
    </CloseableItem>
  ));
}

function redditItems(posts) {
  return posts.map((post, idx) => (
    <CloseableItem
      title={"Reddit — /r/" + post.subreddit}
      logo={redditLogo()}
      key={String(idx)}
    >
      <RedditPost post={post} key={"post-" + String(idx)} />
    </CloseableItem>
  ));
}

function partitionItems(items) {
  const one = [];
  const two = [];
  const three = [];
  if (isMobile) {
    return <ThirdContent key={1}>{items}</ThirdContent>;
  } else {
    items.forEach((item, index) => {
      if (index % 3 === 0) {
        one.push(item);
      } else if (index % 3 === 1) {
        two.push(item);
      } else if (index % 3 === 2) {
        three.push(item);
      }
    });
  }
  return (
    <>
      <ThirdContent key={1}>{one}</ThirdContent>
      <ThirdContent key={2}>{two}</ThirdContent>
      <ThirdContent key={3}>{three}</ThirdContent>
    </>
  );
}

const styles = (th) =>
    StyleSheet.create({
      content: {
        backgroundColor: th.background
      }
    });

export default function Dashboard(props) {
  const { theme } = useContext(ThemeContext);
  const allTeams = getAllTeamsFollowed(props.user.prefs, props.sports);
  const allLeagues = getSportsFollowed(props.user.prefs);
  const styled = styles(theme);
  const tnr = useNews("league", createTeamQuery(allTeams));
  const lnr = useNews("league", allLeagues);
  const tr = useTeamSubreddits(
    props.sports,
    "teamReddit",
    allTeams
      .filter((t) => t.subreddit && t.subreddit !== "")
      .map((t) => [t.sport, t.code]),
      getTeamPosts(props.user.prefs)
  );
  const lr = useLeagueSubreddits(props.sports, "leagueReddit", allLeagues, getLeaguePosts(props.user.prefs));
  function getMsg() {
    if (!props.user.prefs) {
      return loadingSuffix("user");
    }
    return partitionItems(
      condConcat(
        defaultItems(props.user.prefs, props.sports),
        [
          props.user.prefs && !isOneLoading(tr),
          () => redditItems(tr.map((q) => q.data).flat()),
        ],
        [
          props.user.prefs && !isOneLoading(lr),
          () => redditItems(lr.map((q) => q.data).flat()),
        ],
        [
          props.user.prefs && tnr.isSuccess && lnr.isSuccess,
          () => articleItems(joinArticles(tnr.data, lnr.data)),
        ]
      )
    );
  }
  return (
    <div className={css(styled.content) + " content"}>
      {(tnr.isError || lnr.isError) && errorSuffix("loading news")}
      <div className="dashboard">{getMsg()}</div>
    </div>
  );
}
