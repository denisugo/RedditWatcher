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
  selectSelectedSubreddit,
  selectSubreddits,
} from "../../features/SubredditsSlice/SubredditsSlice";

function HomePage(props) {
  const dispatch = useDispatch();

  // Posts logic
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isLoadingPosts = useSelector(selectPostsLoading);
  const isErrorPosts = useSelector(selectPostsError);

  // Subreddits logic
  const subreddits = useSelector(selectSubreddits);
  // replace by changeSubbreddit and useeffect
  const [selectedSubreddit, setSelectedSubreddit] = useState(
    useSelector(selectSelectedSubreddit)
  );

  return (
    <div className="homepage" data-testid="homepage">
      <Posts
        isLoading={isLoadingPosts}
        posts={posts}
        isError={isErrorPosts}
        data-testid="posts"
      />
      <Subreddits
        subreddits={subreddits}
        selectedSubreddit={selectedSubreddit}
        setSelectedSubreddit={setSelectedSubreddit}
      />
    </div>
  );
}

export default HomePage;
