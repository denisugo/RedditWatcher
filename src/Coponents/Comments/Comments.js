import React from "react";
import Comment from "../Comment/Comment";

const comments = [
  {
    user: "Dave",
    date: "2 days ago",
    content: "Nice joke, dude",
    id: 1001,
  },
  {
    user: "HiddenWallet2000",
    date: "2 weeks ago",
    content: "Really cool",
    id: 192,
  },
  {
    user: "Martin",
    date: "10.08.2019",
    content: "How dark it is?",
    id: 12,
  },
];

function Comments(props) {
  return (
    <div className="comments" data-testid="comments">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          user={comment.user}
          date={comment.date}
          content={comment.content}
        />
      ))}
    </div>
  );
}

export default Comments;
