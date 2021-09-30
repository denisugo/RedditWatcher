import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comments.css";

import {
  fetchComments,
  selectComments,
  selectCommentsError,
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

  const loading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);

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
      {loading && (
        <div className="mock-comments" data-testid="mock-comments">
          <CommentsLoader />
          <CommentsLoader />
          <CommentsLoader />
        </div>
      )}
      {error && (
        <div className="comments-error" data-testid="comments-error">
          <h3>Cannot load comments</h3>
        </div>
      )}
    </div>
  );
}

export default Comments;
