import React from "react";
import { PostLogo, PersonIcon } from "./../../utils/icons";
import "./NewsPost.css";
import { checkIfLogged } from "./../../helpers.js";

export default class NewsPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
    };
  }

  ifCommentsDisplayed = false;
  postId = 0;

  componentDidMount = () => {
    const ifLogged = checkIfLogged();

    this.setState({
      authorized: ifLogged,
    });
  };

  displayComments = () => {
    this.ifCommentsDisplayed = this.ifCommentsDisplayed ? false : true;
    this.forceUpdate();
  };

  handleCommentSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("Comment-input").value.length > 0) {
      const { userId } = JSON.parse(localStorage.getItem("userData"));
      const commentData = {
        user_id: userId,
        post_id: this.postId,
        content: `${document.getElementById("Comment-input").value}`,
      };

      this.props.addComment(commentData);
      document.getElementById("Comment-input").value = "";
    }
  };

  render() {
    let imagesDir = "";
    let postPic = "";
    const { postContent } = this.props.newsPostContent;
    console.log(this.props.content);
    let { comments, content, date, id, photo } = this.props.content;
    const [
      showCaption,
      hideCaption,
      buttonCaption,
      placeholderCaption,
      noComments,
    ] = postContent;
    this.postId = id;

    if (JSON.parse(photo)) {
      imagesDir = require.context("./../../utils/img", false);
      postPic = imagesDir(photo);
    }

    return (
      <div className="Post-container">
        <div className="Post-header">
          <PostLogo />
          <p className="Post-date">{date}</p>
        </div>
        <div className="Post-content">
          <p className="Post-paragraph">{content}</p>
          {photo === "null" ? (
            <React.Fragment></React.Fragment>
          ) : (
            <img className="Post-photo" src={postPic} alt="" />
          )}
        </div>
        <hr className="Divider-line" />
        <div className="Comments-section">
          {this.ifCommentsDisplayed ? (
            <ul className="Comments-list">
              {comments && comments.length > 0 ? (
                comments.map((item, index) => {
                  const { content, date, user_name } = item;
                  return (
                    <React.Fragment key={index}>
                      <li className="Post-comment">
                        <PersonIcon className="Comment-icon" />
                        <div className="Comment-header">
                          <span className="Comment-author">{user_name}</span>
                          <span className="Comment-date">{date}</span>
                        </div>
                        <p className="Comment-content">{content}</p>
                      </li>
                      <hr className="Divider-line" />
                    </React.Fragment>
                  );
                })
              ) : (
                <p className="Must-log-alert">{noComments}</p>
              )}
              {this.state.authorized ? (
                <form
                  className="Comment-form"
                  onSubmit={this.handleCommentSubmit}
                >
                  <textarea
                    id="Comment-input"
                    type="text"
                    placeholder={placeholderCaption}
                    className="Comment-input"
                  />
                  <button type="submit" className="Comment-button">
                    {buttonCaption}
                  </button>
                </form>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <hr className="Divider-line" />
            </ul>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </div>
        <button
          onClick={this.displayComments}
          className="Comments-display-button"
        >
          <p className="Comments-display-caption">
            {this.ifCommentsDisplayed ? hideCaption : showCaption}
          </p>
        </button>
      </div>
    );
  }
}
