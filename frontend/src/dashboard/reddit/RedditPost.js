import "../../style/reddit.scss";
import { css, StyleSheet } from "aphrodite";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import ReactMarkdown from "react-markdown";

const styles = (th) => {
  return StyleSheet.create({
    text: {
      color: th.base,
      ":hover": {
        color: th.border,
      },
    },
  });
};

export default function RedditPost(props) {
  const { theme } = useContext(ThemeContext);
  const styled = styles(theme);
  if (!props || !props.prefs || !props.post) {
    return null;
  }
  function title() {
    const titleObj = (
      <p className={css(styled.text) + " reddit-post-title"}>
        {props.post.title}
      </p>
    );
    if (props.post.url && props.post.url !== "") {
      return (
        <a href={props.post.url} target="_blank" rel="noreferrer">
          {titleObj}
        </a>
      );
    }
    return titleObj;
  }
  function upvote() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="bi bi-arrow-up"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
        />
      </svg>
    );
  }
  return (
    <div className="reddit-post">
      <div className="reddit-post-header">{title()}</div>
      {props.post.description && props.post.description !== "" && (
        <div className="reddit-post-description">
          {formatDescription(props.post.description)}
        </div>
      )}
      {props.post.image && (
        <div className="reddit-post-image-wrapper">
          <img
            className="reddit-post-image"
            src={props.post.url}
            alt="post-thumb"
          />
        </div>
      )}
      <div className="reddit-post-footer">
        {upvote()}
        <p className="nomargin">
          {props.post.score} — /u/{props.post.author} —
        </p>
        <a
          href={props.post.redditLink}
          target="_blank"
          rel="noreferrer"
          className={css(styled.text)}
        >
          {props.post.comments} Comments
        </a>
      </div>
    </div>
  );
}

function formatDescription(desc) {
  return <ReactMarkdown>{desc}</ReactMarkdown>;
}
