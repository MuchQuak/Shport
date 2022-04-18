import React, { useState } from "react";
import "../style/dashboard.scss";
import TeamOverview from "./sport/TeamOverview";
import CloseableItem from "./CloseableItem";
import ThirdContent from "./ThirdContent";
import StandingsTable from "./sport/StandingsTable";
import Schedule from "./sport/Schedule";
import Article from "./news/Article";
import { newsQuery } from "./news/NewsHandler";
import {
  getAllTeamsFollowed,
  getSportsFollowed,
} from "../settings/PrefHandler";
import { useQuery } from "react-query";
import { errorSuffix, loading, loadingSuffix } from "../util/Util";

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
  const team_interest = getAllTeamsFollowed(user.prefs, props.sports).map(
    (t) => "(" + t.name + " AND " + t.sport + ") OR " + t.city + " " + t.name
  );
  const league_interest = getSportsFollowed(user.prefs);
  const tnr = useQuery(
    ["teamnews", team_interest],
    () => newsQuery(team_interest),
    {
      onSuccess: (data) => setTeamNews(data),
    }
  );
  const lnr = useQuery(
    ["leaguenews", league_interest],
    () => newsQuery(league_interest),
    {
      onSuccess: (data) => setLeagueNews(data),
    }
  );
  const getMsg = () => {
    if (!props || tnr.isLoading || lnr.isLoading) {
      return loading;
    } else if (!user || !user.prefs) {
      return loadingSuffix("user");
    } else if (user.prefs && tnr.isSuccess && lnr.isSuccess) {
      return partitionItems(
        default_items(user.prefs, props.sports)
          .concat(article_items(user.prefs, teamNews))
          .concat(article_items(user.prefs, leagueNews))
      );
    } else {
      return errorSuffix("loading");
    }
  };
  return (
    <div className="content">
      <div className="dashboard">{getMsg()}</div>
    </div>
  );
}
