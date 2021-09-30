import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Posts from "../../Coponents/Posts/Posts";
import Subreddits from "../../Coponents/Subreddits/Subreddits";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsLoading,
} from "../../features/PostsSlice/PostsSlice";
import {
  changeSubreddit,
  selectSelectedSubreddit,
  selectSubreddits,
} from "../../features/SubredditsSlice/SubredditsSlice";

function HomePage(props) {
  const dispatch = useDispatch();

  // Subreddits logic
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  const setSelectedSubreddit = (payload) => dispatch(changeSubreddit(payload));

  // Posts logic
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  const isLoadingPosts = useSelector(selectPostsLoading);
  const isErrorPosts = useSelector(selectPostsError);

  return (
    <div className="homepage" data-testid="homepage">
      <Subreddits
        subreddits={subreddits}
        selectedSubreddit={selectedSubreddit}
        setSelectedSubreddit={setSelectedSubreddit}
      />
      <Posts
        data-testid="posts"
        isLoading={isLoadingPosts}
        isError={isErrorPosts}
        posts={posts}
      />
    </div>
  );
}

export default HomePage;
