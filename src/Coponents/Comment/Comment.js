import React from "react";

function Comment({ user, date, content }) {
  return (
    <div className="comment" data-testid="comment">
      <h3>{user}</h3>
      <p>
        <em>{date}</em>
      </p>
      <h4>{content}</h4>
    </div>
  );
}

export default Comment;
