import "../../style/article.scss";
import { css, StyleSheet } from "aphrodite";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const styles = (th) => {
  return StyleSheet.create({
    article: {
      color: th.base,
      ":hover": {
        color: th.border,
      },
    },
  });
};

export default function Article(props) {
  const { theme } = useContext(ThemeContext);
  const styled = styles(theme);
  if (!props || !props.prefs || !props.news) {
    return null;
  }
  return (
    <div className="article">
      <a href={props.news.url} rel="noreferrer" target="_blank">
        <p className={css(styled.article) + " article-title"}>
          {props.news.title}
        </p>
        <img
          className="article-img"
          src={props.news.image}
          alt={props.news.title}
        />
      </a>
      <p className="article-date">
        {new Date(props.news.date).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <p className="article-desc">{props.news.description}</p>
    </div>
  );
}
