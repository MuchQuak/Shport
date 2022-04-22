import React from "react";
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
import {allQueriesSuccessful, errorSuffix, loadingSuffix} from "../util/Util";
import {useTeamSubreddits, useLeagueSubreddits} from "./reddit/RedditHandler";
import RedditPost from "./reddit/RedditPost";

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
    <CloseableItem title="Followed Teams" prefs={prefs} sports={sports} key={"item2"}>
      <TeamOverview />
    </CloseableItem>,
    <CloseableItem title="Standings" prefs={prefs} sports={sports} key={"item3"}>
      <StandingsTable />
    </CloseableItem>,
  ];
}
function articleItems(news) {
  return news.map((article, idx) => (
    <CloseableItem title={article.publishBy} key={"articleitem" +   article.url + String(idx)}>
      <Article news={article} key={article.url} />
    </CloseableItem>
  ));
}
function redditItems(posts) {
  function logo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <g>
            <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
            <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path>
          </g>
        </svg>
    );
  }
  return posts.map((post, idx) => (
      <CloseableItem title={"Reddit — /r/" + post.subreddit} logo={logo()} key={String(idx)}>
        <RedditPost post={post} key={"post-" + String(idx)} />
      </CloseableItem>
  ));
}

function partitionItems(items) {
  const one = [];
  const two = [];
  const three = [];
  items.forEach((item, index) => {
    if (index % 3 === 0) {
      one.push(item);
    } else if (index % 3 === 1) {
      two.push(item);
    } else if (index % 3 === 2) {
      three.push(item);
    }
  });
  return (
    <>
      <ThirdContent key={1}>{one}</ThirdContent>
      <ThirdContent key={2}>{two}</ThirdContent>
      <ThirdContent key={3}>{three}</ThirdContent>
    </>
  );
}

export default function Dashboard(props) {
  const allTeams = getAllTeamsFollowed(props.user.prefs, props.sports);
  const allLeagues = getSportsFollowed(props.user.prefs);
  const tnr = useNews(
    "league",
    createTeamQuery(allTeams)
  );
  const lnr = useNews("league", allLeagues);
  const tr = useTeamSubreddits(props.sports,"teamReddit", allTeams.filter(t => t.subreddit && t.subreddit !== "").map(t => [t.sport, t.code]));
  const lr = useLeagueSubreddits(props.sports,"leagueReddit", allLeagues);
  function getMsg() {
    if (!props.user.prefs) {
      return loadingSuffix("user");
    }
    return partitionItems(
      condConcat(defaultItems(props.user.prefs, props.sports),
          [(props.user.prefs && allQueriesSuccessful(tr)), () => redditItems(tr.map(q => q.data).flat())],
          [(props.user.prefs && allQueriesSuccessful(lr)), () => redditItems(lr.map(q => q.data).flat())],
          [(props.user.prefs && tnr.isSuccess && lnr.isSuccess), () => articleItems(joinArticles(tnr.data, lnr.data))])
    );
  }
  return (
    <div className="content">
      {(tnr.isError || lnr.isError) && errorSuffix("loading news")}
      <div className="dashboard">{getMsg()}</div>
    </div>
  );
}
