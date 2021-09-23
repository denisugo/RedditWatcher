import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import "./Post.css";
import Comments from "../Comments/Comments";
import { fixUrl, getDate } from "../../utils/utils";

function Post({
  user,
  date,
  upvotes,
  subreddit,
  comments,
  text,
  title,
  images,
  video,
}) {
  date = getDate(date);

  const fullName = `${user} (${subreddit})`;

  // Styling objects
  // Olny handling mouse enter and mouse leave events
  const [colorArrowUp, setColorArrowUp] = useState("#706F6F");
  const [colorArrowDown, setColorArrowDown] = useState("#706F6F");
  const [colorComment, setColorComment] = useState("#706F6F");

  const handleMouseEnterArrowUp = () => setColorArrowUp("#de551f");
  const handleMouseLeaveArrowUp = () => setColorArrowUp("#706F6F");

  const handleMouseEnterArrowDown = () => setColorArrowDown("#de551f");
  const handleMouseLeaveArrowDown = () => setColorArrowDown("#706F6F");

  const handleMouseEnterArrowComment = () => setColorComment("#de551f");
  const handleMouseLeaveArrowComment = () => setColorComment("#706F6F");

  // Handle clicks
  const [showComments, setShowComments] = useState(false);

  const handleOnClickComment = () => {
    if (showComments) setShowComments(false);
    else setShowComments(true);
  };

  return (
    <div className="post" data-testid="post">
      <h2>{fullName}</h2>
      <p className="date">{date}</p>
      <div className="post-content">
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
          <video loop autoPlay muted data-testid="video">
            <source src={video} />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
        <hr />
      </div>
      <div className="up-down-comment">
        <div className="arrows">
          <FontAwesomeIcon
            className="arrow-up"
            role="button"
            icon={faArrowUp}
            size={"1x"}
            style={{ color: colorArrowUp }}
            data-testid="arrow-up"
            onMouseEnter={handleMouseEnterArrowUp}
            onMouseLeave={handleMouseLeaveArrowUp}
          />

          <p>{upvotes}</p>

          <FontAwesomeIcon
            className="arrow-down"
            role="button"
            icon={faArrowDown}
            size={"1x"}
            style={{ color: colorArrowDown }}
            data-testid="arrow-down"
            onMouseEnter={handleMouseEnterArrowDown}
            onMouseLeave={handleMouseLeaveArrowDown}
          />
        </div>
        <div className="comment-section">
          <FontAwesomeIcon
            className="comment-button"
            role="button"
            icon={faCommentAlt}
            size={"1x"}
            style={{ color: colorComment }}
            data-testid="comment-button"
            onMouseEnter={handleMouseEnterArrowComment}
            onMouseLeave={handleMouseLeaveArrowComment}
            onClick={handleOnClickComment}
          />
          <p>{comments}</p>
        </div>
      </div>
      {showComments && (
        <Comments
          data-testid="comments"
          url="/r/PublicFreakout/comments/ptuyci/antimasker_gets_owned/"
        />
      )}
    </div>
  );
}

export default Post;
