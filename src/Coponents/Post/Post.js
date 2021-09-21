import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import "./Post.css";
import Mock from "../../assets/mock.jpg";
import Comments from "../Comments/Comments";

function Post(props) {
  //   Styling objects
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

  //   Handle clicks
  const [showComments, setShowComments] = useState(false);

  const handleOnClickComment = () => {
    if (showComments) setShowComments(false);
    else setShowComments(true);
  };

  return (
    <div className="post" data-testid="post">
      <h2>User name</h2>
      <p className="date">19.09.2021</p>
      <div className="post-content">
        <h3>This is really funny)))</h3>
        <img src={Mock} alt="Post content" />
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

          <p>123</p>

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
          <p>334</p>
        </div>
      </div>
      {showComments && <Comments data-testid="comments" />}
    </div>
  );
}

export default Post;
