import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comments.css";

import {
  fetchComments,
  selectComments,
  selectCommentsLoading,
} from "../../features/CommentsSlice/CommentsSlice";
import Comment from "../Comment/Comment";
import CommentsLoader from "../Loaders/CommentsLoader/CommentsLoader";

function Comments({ url, id }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectComments)[id];

  useEffect(() => {
    dispatch(fetchComments({ url, id }));
  }, [dispatch, url, id]);

  const isLoading = useSelector(selectCommentsLoading);
  return (
    <div className="comments" data-testid="comments">
      {comments &&
        comments.map((comment) => {
          if (comment.data.body)
            return (
              <Comment
                key={comment.data.id}
                user={comment.data.author}
                date={comment.data.created}
                content={comment.data.body}
              />
            );
          return null;
        })}
      {isLoading && (
        <div className="loader" data-testid="loader">
          <CommentsLoader />
          <CommentsLoader />
          <CommentsLoader />
        </div>
      )}
    </div>
  );
}

export default Comments;
