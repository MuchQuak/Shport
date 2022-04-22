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
import { errorSuffix, loadingSuffix } from "../util/Util";

function defaultItems(prefs, sports) {
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
function articleItems(prefs, news) {
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
  const tnr = useNews(
    "league",
    createTeamQuery(getAllTeamsFollowed(props.user.prefs, props.sports))
  );
  const lnr = useNews("league", getSportsFollowed(props.user.prefs));
  function getMsg() {
    if (!props.user.prefs) {
      return loadingSuffix("user");
    }
    const defaultDashItems = defaultItems(props.user.prefs, props.sports);
    return partitionItems(
      props.user.prefs && tnr.isSuccess && lnr.isSuccess
        ? defaultDashItems.concat(
            articleItems(props.user.prefs, joinArticles(tnr.data, lnr.data))
          )
        : defaultDashItems
    );
  }
  return (
    <div className="content">
      {(tnr.isError || lnr.isError) && errorSuffix("loading news")}
      <div className="dashboard">{getMsg()}</div>
    </div>
  );
}
