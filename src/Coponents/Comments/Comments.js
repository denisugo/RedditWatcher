import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  selectComments,
} from "../../features/CommentsSlice/CommentsSlice";
import Comment from "../Comment/Comment";

// const comments = [
//   {
//     user: "Dave",
//     date: "2 days ago",
//     content: "Nice joke, dude",
//     id: 1001,
//   },
//   {
//     user: "HiddenWallet2000",
//     date: "2 weeks ago",
//     content: "Really cool",
//     id: 192,
//   },
//   {
//     user: "Martin",
//     date: "10.08.2019",
//     content: "How dark it is?",
//     id: 12,
//   },
// ];

function Comments({ url }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments(url));
  }, [dispatch, url]);

  return (
    <div className="comments" data-testid="comments">
      {comments.map((comment) => (
        <Comment
          key={comment.data.id}
          user={comment.data.author}
          date={comment.data.created}
          content={comment.data.body}
        />
      ))}
    </div>
  );
}

export default Comments;
