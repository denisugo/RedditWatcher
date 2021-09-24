import React, { useState } from "react";
import { getDate } from "../../utils/utils";
import "./Comment.css";

function Comment({ user, date, content }) {
  date = getDate(date);

  // Styling
  const [shadow, setShadow] = useState(null);
  const handleMouseEnter = () => setShadow("0 3px 8px #b7e0f7");
  const handleMouseLeave = () => setShadow(null);

  return (
    <div
      className="comment"
      data-testid="comment"
      style={{ boxShadow: shadow }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="user">{user}</h3>
      <p className="date">
        <em>{date}</em>
      </p>
      <h4 className="content">{content}</h4>
    </div>
  );
}

export default Comment;
