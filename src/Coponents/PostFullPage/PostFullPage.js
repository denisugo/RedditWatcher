import React, { useState } from "react";
import "./PostFullPage.css";

import { fixUrl, getDate } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";

function PostFullPage({ post }) {
  //  Checking image and video availability
  const getImageVideo = () => {
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

    return { images, video };
  };

  const { images, video } = getImageVideo();

  const user = post.data.author;
  const subreddit = post.data.subreddit_name_prefixed;
  const date = getDate(post.data.created);
  const title = post.data.title;
  const text = post.data.selftext;
  const upvotes = post.data.ups;
  const numOfComments = post.data.num_comments;

  const fullName = `${user} (${subreddit})`;

  // Styling objects
  // Olny handling mouse enter and mouse leave events
  const [classArrowUp, setClassArrowUp] = useState("default");
  const [classArrowDown, setClassArrowDown] = useState("default");

  const handleMouseEnterArrowUp = () => setClassArrowUp("hovered");
  const handleMouseLeaveArrowUp = () => setClassArrowUp("default");

  const handleMouseEnterArrowDown = () => setClassArrowDown("hovered");
  const handleMouseLeaveArrowDown = () => setClassArrowDown("default");

  return (
    <div className="post-fullpage" data-testid="post-fullpage">
      <h2>{fullName}</h2>
      <p className="date">{date}</p>
      <div className="post-fullpage-content">
        <h3>{title}</h3>
        <h4>{text}</h4>
        {images &&
          images.map((image, index) => (
            <img
              key={index}
              src={fixUrl(image.source.url)}
              alt="Post content"
              data-testid={"post-image-" + index}
            />
          ))}
        {video && (
          <video loop autoPlay muted controls data-testid="video">
            <source src={video} data-testid="video-source" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        <hr />
      </div>
      <div className="up-down-comment">
        <div className="arrows">
          <FontAwesomeIcon
            className={`arrow-up arrow-up-${classArrowUp}`}
            role="button"
            icon={faArrowUp}
            size={"1x"}
            data-testid="arrow-up"
            onMouseEnter={handleMouseEnterArrowUp}
            onMouseLeave={handleMouseLeaveArrowUp}
          />

          <p>{upvotes}</p>

          <FontAwesomeIcon
            className={`arrow-down arrow-down-${classArrowDown}`}
            role="button"
            icon={faArrowDown}
            size={"1x"}
            data-testid="arrow-down"
            onMouseEnter={handleMouseEnterArrowDown}
            onMouseLeave={handleMouseLeaveArrowDown}
          />
        </div>
        <div className="mock-comment-button" data-testid="mock-comment-button">
          <FontAwesomeIcon icon={faCommentAlt} size={"1x"} />
          <p>{numOfComments}</p>
        </div>
      </div>
    </div>
  );
}

export default PostFullPage;
