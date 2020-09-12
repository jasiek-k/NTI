import React from "react";
import NewsPost from "./../components/NewsPost";
import "./../styles/subpageTheme.css";
import axios from "axios";
import { CloseIcon, SearchIcon } from "./../utils/icons";

export default class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedData: [],
      allPosts: [],
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get("http://127.0.0.1:5000/news", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        this.setState({
          displayedData: res.data.posts,
          allPosts: res.data.posts,
        });
      })
      .catch((err) => console.log(err));
  };

  addComment = (value) => {
    this.sendResponse(value);
    this.getPosts();
  };

  sendResponse = (comment) => {
    console.log(comment);
    axios
      .post(
        "http://127.0.0.1:5000/comment",
        null,
        { params: comment },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "text/html; charset=utf-8",
          Accept: "application/json",
          "Access-Control-Request-Method": "POST",
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
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
        {
            localStorage.getItem("userLogged") ? (<div>USER LOGGED</div>) : (<p className="Must-log-alert">ZALOGUJ SIĘ W SEKCJI PROFILU, ABY KORZYSTAĆ Z FUNKCJI NEWS'ÓW</p>)
        }
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
