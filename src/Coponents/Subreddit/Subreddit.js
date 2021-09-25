import React from "react";
import "./Subreddit.css";

// Styles could be default, selected or hovered
function Subreddit({ icon, name }) {
  return (
    <div className="subreddit subreddit-default" data-testid="subreddit">
      <img src={icon} alt="icon" data-testid="icon" />
      <h2>{name}</h2>
    </div>
  );
}

export default Subreddit;
