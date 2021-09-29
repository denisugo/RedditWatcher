import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import "./Post.css";
import Comments from "../Comments/Comments";
import { fixUrl, getDate } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { deleteComments } from "../../features/CommentsSlice/CommentsSlice";

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
  permalink,
  id,
}) {
  date = getDate(date);

  const fullName = `${user} (${subreddit})`;

  // Styling objects
  // Olny handling mouse enter and mouse leave events

  const [styleArrowUp, setStyleArrowUp] = useState({
    color: "#706F6F",
    backgroundColor: null,
  });
  const [styleArrowDown, setStyleArrowDown] = useState({
    color: "#706F6F",
    backgroundColor: null,
  });
  const [styleComment, setStyleComment] = useState({
    color: "#706F6F",
    backgroundColor: null,
  });

  const handleMouseEnterArrowUp = () =>
    setStyleArrowUp({ color: "#de551f", backgroundColor: "#dfdfdf" });
  const handleMouseLeaveArrowUp = () =>
    setStyleArrowUp({ color: "#706F6F", backgroundColor: null });

  const handleMouseEnterArrowDown = () =>
    setStyleArrowDown({ color: "#de551f", backgroundColor: "#dfdfdf" });
  const handleMouseLeaveArrowDown = () =>
    setStyleArrowDown({ color: "#706F6F", backgroundColor: null });

  const handleMouseEnterArrowComment = () =>
    setStyleComment({ color: "#de551f", backgroundColor: "#dfdfdf" });
  const handleMouseLeaveArrowComment = () =>
    setStyleComment({ color: "#706F6F", backgroundColor: null });

  // Handle clicks
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();

  const handleOnClickComment = () => {
    if (showComments) {
      dispatch(deleteComments(id));
      setShowComments(false);
    } else setShowComments(true);
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
          <video loop autoPlay muted controls data-testid="video">
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
            style={styleArrowUp}
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
            style={styleArrowDown}
            data-testid="arrow-down"
            onMouseEnter={handleMouseEnterArrowDown}
            onMouseLeave={handleMouseLeaveArrowDown}
          />
        </div>
        <div
          className="comment-button"
          role="button"
          aria-pressed="false"
          aria-disabled
          tabIndex="0"
          onMouseEnter={handleMouseEnterArrowComment}
          onMouseLeave={handleMouseLeaveArrowComment}
          onFocus={handleMouseEnterArrowComment}
          onBlur={handleMouseLeaveArrowComment}
          onClick={handleOnClickComment}
          onKeyPress={handleOnClickComment}
          data-testid="comment-button"
          style={styleComment}
        >
          <FontAwesomeIcon icon={faCommentAlt} size={"1x"} />
          <p>{comments}</p>
        </div>
      </div>
      {showComments && (
        <Comments data-testid="comments" url={permalink} id={id} />
      )}
    </div>
  );
}

export default Post;
