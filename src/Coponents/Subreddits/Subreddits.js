import React from "react";
import "./Subreddits.css";

import Subreddit from "../Subreddit/Subreddit";

function Subreddits({ subreddits, selectedSubreddit, setSelectedSubreddit }) {
  return (
    <div className="subreddits" data-testid="subreddits">
      <h2 className="subreddits-title">Subreddits</h2>
      {subreddits.map((subreddit) => {
        let selected = false;
        if (selectedSubreddit === subreddit.subreddit) selected = true;

        return (
          <Subreddit
            key={subreddit.id}
            selectedSubreddit={selected}
            setSelectedSubreddit={setSelectedSubreddit}
            data-testid="subreddit"
            {...subreddit}
          />
        );
      })}
    </div>
  );
}

export default Subreddits;
