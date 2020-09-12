import React from "react";
import NewsPost from "./../../components/newsPost/NewsPost";
import axios from "axios";
import { CloseIcon, SearchIcon } from "./../../utils/icons";
import "./news.css";
import { getAllPosts, addNewComment } from "./../../services/newsService";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedData: [],
      allPosts: [],
      authorized: false,
    };
  }

  componentDidMount() {
    const { userLogged } = JSON.parse(localStorage.getItem("userData"));

    this.getPosts();
    if (userLogged) {
      this.setState({
        authorized: true,
      });
    }
  }

  getPosts = async () => {
    try {
      const response = await getAllPosts();
      this.setState({
        displayedData: response.data.posts,
        allPosts: response.data.posts,
      });
    } catch (err) {
      console.log(err);
    }
  };

  addComment = (value) => {
    this.sendResponse(value);
    this.getPosts();
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
          <div>USER LOGGED</div>
        ) : (
          <p className="Must-log-alert">
            ZALOGUJ SIĘ W SEKCJI PROFILU, ABY KORZYSTAĆ Z FUNKCJI NEWS'ÓW
          </p>
        )}
        {this.state.displayedData.length > 0 ? (
          [...this.state.displayedData].map((item, index) => {
            return (
              <NewsPost
                newsPostContent={this.props.newsContent}
                addComment={this.addComment}
                content={item}
                key={index}
              />
            );
          })
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
