import React, { useState } from "react";
import "./Subreddit.css";

// Styles could be default, selected or hovered
function Subreddit({
  icon,
  name,
  subreddit,
  selectedSubreddit = false,
  setSelectedSubreddit,
}) {
  const [className, setClassName] = useState("default");

  const handleMouseEnter = () => {
    if (!selectedSubreddit) setClassName("hovered");
  };
  const handleMouseLeave = () => {
    if (!selectedSubreddit) setClassName("default");
  };
  const handleClick = () => {
    setClassName("default");
    setSelectedSubreddit(subreddit);
  };

  return (
    <div
      className={`subreddit subreddit-${
        selectedSubreddit ? "selected" : className
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleClick}
      onKeyPress={handleClick}
      data-testid="subreddit"
      role="button"
      aria-pressed="false"
      aria-disabled
      tabIndex="1"
    >
      <img src={icon} alt="icon" data-testid="icon" />
      <h2>{name}</h2>
    </div>
  );
}

export default Subreddit;
