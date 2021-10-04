import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectSelectedSubreddit,
  selectSubreddits,
} from "../../features/SubredditsSlice/SubredditsSlice";
import Subreddit from "../Subreddit/Subreddit";
import "./SearchBarMobileSubreddits.css";

function SearchBarMobileSubreddits({ onSelect }) {
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  return (
    <div className="searchbar-subreddit">
      {subreddits.map((subreddit) => {
        let selected = false;
        if (selectedSubreddit === subreddit.subreddit) selected = true;

        return (
          <Link to="/" key={subreddit.id} className="subreddit-link">
            <Subreddit
              selectedSubreddit={selected}
              setSelectedSubreddit={onSelect}
              data-testid="subreddit"
              {...subreddit}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default SearchBarMobileSubreddits;
