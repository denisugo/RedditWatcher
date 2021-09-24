import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts, selectPosts } from "../../features/PostsSlice/PostsSlice";
import Post from "../Post/Post";

function Posts(props) {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="posts" data-testid="posts">
      {posts.map((post) => {
        let images;
        if (post.data.preview && !post.data.is_video) {
          if (post.data.preview.variants) {
            if (post.data.preview.variants.gif) {
              images = [post.data.preview.variants.gif];
            } else {
              images = post.data.preview.images;
            }
          } else {
            images = post.data.preview.images;
          }
        } else {
          images = null;
        }
        let video = post.data.is_video
          ? post.data.media.reddit_video.fallback_url
          : null;

        return (
          <Post
            key={post.data.id}
            id={post.data.id}
            user={post.data.author}
            subreddit={post.data.subreddit_name_prefixed}
            date={post.data.created}
            title={post.data.title}
            text={post.data.selftext}
            images={images}
            video={video}
            upvotes={post.data.ups}
            comments={post.data.num_comments}
            permalink={post.data.permalink}
          />
        );
      })}
    </div>
  );
}

export default Posts;
