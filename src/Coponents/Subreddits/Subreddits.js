import React from "react";
import "./Subreddits.css";

import science from "../../assets/subredditsIcons/science.png";
import Subreddit from "../Subreddit/Subreddit";

const subreddits = [
  {
    name: "science",
    subreddit: "r/science",
    icon: science,
    id: 0,
  },
  {
    name: "funny",
    subreddit: "r/science",
    icon: science,
    id: 1,
  },
  {
    name: "Lock",
    subreddit: "r/science",
    icon: science,
    id: 2,
  },
];

function Subreddits(props) {
  return (
    <div className="subreddits" data-testid="subreddits">
      <h2 className="subreddits-title">Subreddits</h2>
      {subreddits.map((subreddit) => (
        <Subreddit key={subreddit.id} data-testid="subreddit" {...subreddit} />
      ))}
    </div>
  );
}

export default Subreddits;
