import React from "react";
import { getDate } from "../../utils/utils";

function CommentRecursive({ user, replies, text, date }) {
  date = getDate(date);
  const hasChildren = replies && replies.data.children.length;

  if (!user) return null;

  return (
    <div className="comment-nest">
      <h3 className="user">{user}</h3>
      <p className="date">
        <em>{date}</em>
      </p>
      <p className="content">{text}</p>
      <ul>
        {hasChildren &&
          replies.data.children.map((reply, index) => (
            <li key={reply.data.id}>
              <CommentRecursive
                user={reply.data.author}
                replies={reply.data.replies}
                text={reply.data.body}
                date={reply.data.created}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CommentRecursive;
