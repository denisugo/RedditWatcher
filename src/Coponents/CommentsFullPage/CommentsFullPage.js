import React from "react";
import CommentRecursive from "./CommentRecursive";
import "./CommentsFullPage.css";

function CommentsFullPage({ comments }) {
  return (
    <div className="comments-fullpage" data-testid="comments-fullpage">
      <ul>
        {comments.map((comment) => (
          <li key={comment.data.id}>
            <CommentRecursive
              date={comment.data.created}
              text={comment.data.body}
              user={comment.data.author}
              replies={comment.data.replies}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsFullPage;
