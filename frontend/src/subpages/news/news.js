import React from "react";
import NewsPost from "./../../components/newsPost/NewsPost";
import { CloseIcon, SearchIcon } from "./../../utils/icons";
import "./news.css";
import { getAllPosts, addNewComment } from "./../../services/newsService";
import { checkIfLogged } from "./../../helpers.js";
import AddPost from "./../../components/addPost/AddPost";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedData: [],
      allPosts: [],
      authorized: false,
      superUser: false,
    };
  }

  componentDidMount() {
    this.getPosts();
    const ifLogged = checkIfLogged();

    this.setState({
      authorized: ifLogged,
    });
    this.setState({
      superUser: this.checkUser(),
    });
  }

  getPosts = async () => {
    try {
      const response = await getAllPosts();
      this.setState({
        displayedData: response.data.posts,
        allPosts: response.data.posts,
      });
    } catch (err) {
      window.alert(`Coś poszło nie tak! Spróbuj ponownie później.`);
    }
  };

  checkUser = () => {
    const isAdmin = parseInt(localStorage.getItem("superUser"));
    if (isAdmin && isAdmin === 1413912) {
      return true;
    } else return false;
  };

  addComment = async (value) => {
    try {
      this.sendResponse(value);
      await this.getPosts();
    } catch (error) {}
  };

  sendResponse = async (comment) => {
    console.log(comment);
    try {
      await addNewComment(comment);
    } catch (error) {
      console.log(error);
    }
  };

  searchPost = (e) => {
    e.preventDefault();
    const allPosts = [...this.state.allPosts];
    const postsToDisplay = [];
    for (let i = 0; i < allPosts.length; i++) {
      if (
        allPosts[i].content
          .toLowerCase()
          .includes(
            document.getElementById("News-search-input").value.toLowerCase()
          ) ||
        document
          .getElementById("News-search-input")
          .value.toLowerCase()
          .includes(allPosts[i].content.toLowerCase())
      ) {
        postsToDisplay.push(allPosts[i]);
      }
    }
    this.setState({
      displayedData: postsToDisplay,
    });
  };

  refreshSearch = () => {
    this.setState({
      displayedData: [...this.state.allPosts],
    });
    document.getElementById("News-search-input").value = "";
  };

  render() {
    const [searchCaption] = this.props.newsContent.subpageContent;

    return (
      <div className="News-subpage">
        <form className="News-search-post" onSubmit={this.searchPost}>
          <button
            className="News-search-button"
            onClick={this.searchPost}
            type="submit"
          >
            <SearchIcon />
          </button>
          <input
            className="News-search-input"
            id="News-search-input"
            type="test"
            placeholder={searchCaption}
          ></input>
          <button className="News-close-button" onClick={this.refreshSearch}>
            <CloseIcon />
          </button>
        </form>
        {this.state.authorized ? (
          <React.Fragment></React.Fragment>
        ) : (
          <p className="Must-log-alert">{this.props.newsContent.logAlert}</p>
        )}
        {this.state.superUser ? <AddPost /> : <React.Fragment></React.Fragment>}
        {this.state.displayedData.length > 0 ? (
          <div className="News-posts-section">
            {[...this.state.displayedData].map((item, index) => {
              return (
                <NewsPost
                  newsPostContent={this.props.newsContent}
                  addComment={this.addComment}
                  content={item}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          <p className="News-search-error">
            Currently there are no results to show. Press the close button in
            order to refresh searching or try again later.
          </p>
        )}
      </div>
    );
  }
}
