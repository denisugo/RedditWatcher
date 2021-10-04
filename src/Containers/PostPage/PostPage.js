import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PostPage.css";

import {
  fetchPostWithComments,
  selectCommentsError,
  selectCommentsLoading,
  selectPostWithComments,
} from "../../features/CommentsSlice/CommentsSlice";
import PostFullPage from "../../Coponents/PostFullPage/PostFullPage";
import CommentsFullPage from "../../Coponents/CommentsFullPage/CommentsFullPage";
import PostPageLoader from "../../Coponents/Loaders/PostPageLoader/PostPageLoader";

function PostPage(props) {
  // Fetching logic

  const permalink =
    "/" +
    props.match.params.prefix +
    "/" +
    props.match.params.subreddit +
    "/" +
    props.match.params.selector +
    "/" +
    props.match.params.id +
    "/" +
    props.match.params.title +
    "/";

  const dispatch = useDispatch();

  const { post, comments } = useSelector(selectPostWithComments);
  const loading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);

  useEffect(() => {
    dispatch(fetchPostWithComments(permalink));
  }, [dispatch, permalink]);

  return (
    <div className="postpage" data-testid="postpage">
      {post && <PostFullPage post={post} />}
      {comments && <CommentsFullPage comments={comments} />}
      {error && (
        <div className="post-comments-error" data-testid="post-comments-error">
          <h2>Cannot load this post, please try to reload the page</h2>
        </div>
      )}
      {loading && (
        <div className="mock-post-comments" data-testid="mock-post-comments">
          <PostPageLoader />
        </div>
      )}
    </div>
  );
}

export default PostPage;
