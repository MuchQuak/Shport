import React, { useState } from "react";
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
import { errorSuffix, loadingSuffix } from "../util/Util";

function default_items(prefs, sports) {
  return [
    <CloseableItem title="Schedule" prefs={prefs} sports={sports} key={0}>
      <Schedule />
    </CloseableItem>,
    <CloseableItem title="Followed Teams" prefs={prefs} sports={sports} key={1}>
      <TeamOverview />
    </CloseableItem>,
    <CloseableItem title="Standings" prefs={prefs} sports={sports} key={2}>
      <StandingsTable />
    </CloseableItem>,
  ];
}
function article_items(prefs, news) {
  return news.map((article, idx) => (
    <CloseableItem title={article.publishBy} key={article.url + String(idx)}>
      <Article news={article} key={article.url} />
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
      <ThirdContent key={0}>{one}</ThirdContent>
      <ThirdContent key={1}>{two}</ThirdContent>
      <ThirdContent key={2}>{three}</ThirdContent>
    </>
  );
}

export default function Dashboard(props) {
  const [teamNews, setTeamNews] = useState([]);
  const [leagueNews, setLeagueNews] = useState([]);
  const user = props.user;
  const team_interest = createTeamQuery(
    getAllTeamsFollowed(user.prefs, props.sports)
  );
  const tnr = useNews("league", team_interest, setTeamNews);
  const lnr = useNews("league", getSportsFollowed(user.prefs), setLeagueNews);
  function getMsg() {
    if (!props || !user || !user.prefs) {
      return loadingSuffix("user");
    }
    let items = default_items(user.prefs, props.sports);
    if (user.prefs && tnr.isSuccess && lnr.isSuccess) {
      items = items.concat(
        article_items(user.prefs, joinArticles(teamNews, leagueNews))
      );
    }
    return partitionItems(items);
  }
  return (
    <div className="content">
      {(tnr.isError || lnr.isError) && errorSuffix("loading news")}
      <div className="dashboard">{getMsg()}</div>
    </div>
  );
}
