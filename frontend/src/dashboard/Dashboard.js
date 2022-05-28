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
} from "../user/PrefHandler";
import { isOneLoading, errorSuffix, loadingSuffix } from "../util/Util";
import {useTeamSubreddits, useLeagueSubreddits, redditLogo, getTeamPosts, getLeaguePosts} from "./reddit/RedditHandler";
import RedditPost from "./reddit/RedditPost";
import {SportContext, ThemeContext, UserContext} from "../App";
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
  return posts.filter((p) => p !== undefined).map((post, idx) => (
        <CloseableItem
          title={"Reddit — /r/" + post.subreddit}
          link={"https://reddit.com/r/" + post.subreddit}
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

export default function Dashboard() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const sports = useContext(SportContext);
  const allTeams = getAllTeamsFollowed(user.prefs, sports);
  const allLeagues = getSportsFollowed(user.prefs);
  const styled = styles(theme);
  const tnr = useNews("league", createTeamQuery(allTeams));
  const lnr = useNews("league", allLeagues);
  const tr = useTeamSubreddits(
    sports,
    "teamReddit",
    allTeams
      .filter((t) => t.subreddit && t.subreddit !== "")
      .map((t) => [t.sport, t.code]),
      getTeamPosts(user.prefs)
  );
  const lr = useLeagueSubreddits(sports, "leagueReddit", allLeagues, getLeaguePosts(user.prefs));
  function getMsg() {
    if (!user.prefs) {
      return loadingSuffix("user");
    }
    return partitionItems(
      condConcat(
        defaultItems(user.prefs, sports),
        [
          user.prefs && !isOneLoading(tr),
          () => redditItems(tr.map((q) => q.data).flat()),
        ],
        [
          user.prefs && !isOneLoading(lr),
          () => redditItems(lr.map((q) => q.data).flat()),
        ],
        [
          user.prefs && tnr.isSuccess && lnr.isSuccess,
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
