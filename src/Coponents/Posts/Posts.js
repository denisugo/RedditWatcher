import React, { useEffect } from "react";
import "./Posts.css";

import PostsLoader from "../Loaders/PostsLoader/PostsLoader";
import Post from "../Post/Post";

function Posts({ isLoading, posts, isError }) {
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

      {isLoading && (
        <div className="mock-posts" data-testid="mock-posts">
          <div className="mock-post">
            <PostsLoader />
          </div>
          <div className="mock-post">
            <PostsLoader />
          </div>
          <div className="mock-post">
            <PostsLoader />
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
